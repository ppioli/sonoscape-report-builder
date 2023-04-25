import { readdir, stat } from 'node:fs/promises';
import path from 'path';
import fs from 'fs/promises';
import { XMLParser } from 'fast-xml-parser';
import { ClientException } from '../exception/ClientException';
import {
  PatientSyncEvent,
  PatientSyncEventStatus,
} from '../../shared/responses/PatientSyncEvent';
import Logger from '../Logger';
import { Patient as IPatient } from '../../shared/model/Patient';
import db from '../db/db';
import { Patient } from '../db/model/Patient';
import { Report } from '../db/model/Report';

async function getAllDirectories(directory: string) {
  const reports = await readdir(directory);
  const fileList = await Promise.all(
    reports.map(async (file) => {
      const fileStat = await stat(path.join(directory, file));
      return {
        isDirectory: fileStat.isDirectory(),
        file,
      };
    })
  );

  return fileList.filter((file) => file.isDirectory).map((file) => file.file);
}

async function parsePatientDate(
  path: string
): Promise<Omit<IPatient, 'reports'>> {
  try {
    const fileData = await fs.readFile(path, {
      encoding: 'utf8',
    });
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    };
    const parser = new XMLParser(options);
    const patientData = parser.parse(fileData);
    Logger.info('Parsing patient', patientData);
    const p = patientData.ROOT.Patient;
    const exam = p.Exam;
    db.getRepository(Patient);
    Logger.info(exam);

    return {
      id: p.PatientID,
      firstName: p.PatientName,
      lastName: p.PatientName,
    };
  } catch (err) {
    // todo handle error
    throw err;
  }
}

async function syncReport(master: string, patient: string, report: string) {
  const directory = path.join(master, patient, report);
  const files = await readdir(directory);
  const patientId = patient.split('_')[0];
  const patientXmlFile = files.filter(
    (f) => f.match(`Report_Cardiac${patientId}[0-9]+\\.xml`)?.length
  );

  if (patientXmlFile.length !== 1) {
    throw new ClientException(
      `No puedo encontrarse la informacion del reporte ${report} para el paciente ${patient}`
    );
  }
  const patientDataFilePath = path.join(
    master,
    patient,
    report,
    patientXmlFile[0]
  );

  // Parse and update the patient
  const patientRepository = db.getRepository(Patient);
  const reportRepository = db.getRepository(Report);
  const parsedPatient = await parsePatientDate(patientDataFilePath);
  let existingPatient = await patientRepository.findOne({
    where: {
      id: parsedPatient.id,
    },
  });
  if (!existingPatient) {
    existingPatient = await patientRepository.save(new Patient(parsedPatient));
  }
  const existingReport = await reportRepository.findOneBy({
    id: report,
  });
  const parsedReport = new Report({
    id: report,
    done: false,
    createdAt: new Date(),
    patient: existingPatient,
  });
  if (!existingReport) {
    await reportRepository.save(new Report(parsedReport));
  }
  return PatientSyncEventStatus.DONE;
}

export async function readMaster(
  master: string,
  callback: (result: PatientSyncEvent) => void
) {
  const masterStat = await stat(master);
  if (!masterStat.isDirectory()) {
    throw new ClientException('The directory');
  }
  const patients = await getAllDirectories(master);
  for (const patient of patients) {
    // eslint-disable-next-line no-await-in-loop
    const reports = await getAllDirectories(path.join(master, patient));
    for (const report of reports) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const result = await syncReport(master, patient, report);
        callback({
          status: result,
          patientId: patient,
          reportId: report,
        });
      } catch (error: any) {
        Logger.error(
          `Error processing patient ${patient}, report ${report}`,
          error
        );
        callback({
          status: PatientSyncEventStatus.ERROR,
          patientId: patient,
          reportId: report,
        });
      }
    }
  }
}
