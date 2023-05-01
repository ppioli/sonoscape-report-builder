import { readdir, stat } from 'node:fs/promises';
import path from 'path';
import fs from 'fs/promises';
import { XMLParser } from 'fast-xml-parser';
import { v4 as uuuid } from 'uuid';
import { ClientException } from '../exception/ClientException';
import {
  PatientSyncEvent,
  PatientSyncEventStatus,
} from '../../shared/responses/PatientSyncEvent';
import Logger from '../Logger';
import { ReportData } from '../../shared/model/ReportData';
import { ImageData } from '../../shared/model/ImageData';
import { defaultFlowData } from '../../shared/model/DopplerFlowData';
import { defaultMeasurements } from '../../shared/model/MeasurementsData';
import patientService from '../report/PatientService';
import reportService from '../report/ReportService';
import { AppDataDir } from '../config/registerConfigApi';

export class MasterReader {
  private readonly _masterDir: string;

  private readonly _parser: XMLParser;

  constructor(master: string) {
    this._masterDir = master;
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    };
    this._parser = new XMLParser(options);
  }

  public async readMaster(callback: (result: PatientSyncEvent) => void) {
    Logger.info(`Starting sync process on ${this._masterDir}`);
    const masterStat = await stat(this._masterDir);
    if (!masterStat.isDirectory()) {
      throw new ClientException(
        `The master directory ${this._masterDir} is not a valid directory`
      );
    }
    const patients = await MasterReader.findDirectories(this._masterDir);
    for (const patient of patients) {
      const patientId = MasterReader.extractPatientId(patient);
      // eslint-disable-next-line no-await-in-loop
      const reports = await MasterReader.findDirectories(
        path.join(this._masterDir, patient)
      );
      for (const reportDir of reports) {
        const reportId = reportDir;
        try {
          // eslint-disable-next-line no-await-in-loop
          if (await reportService.reportExist(reportDir)) {
            return callback({
              status: PatientSyncEventStatus.EXISTING,
              patientId,
              reportId,
            });
          }
          // eslint-disable-next-line no-await-in-loop
          await this.syncReport(patient, reportDir);
          callback({
            status: PatientSyncEventStatus.DONE,
            patientId,
            reportId,
          });
        } catch (error: any) {
          Logger.error(
            `Error processing patient ${patientId}, report ${reportId}`,
            error
          );
          callback({
            status: PatientSyncEventStatus.ERROR,
            patientId,
            reportId,
          });
        }
      }
    }
    return true;
  }

  private async parseReport(reportPath: string): Promise<ReportData> {
    const fileString = await fs.readFile(reportPath, {
      encoding: 'utf8',
    });
    const patientData = this._parser.parse(fileString);
    Logger.info('Parsing patient', patientData);
    const p = patientData.ROOT.Patient;
    const exam = p.Exam;

    const images: ImageData[] = [];
    for (const image of exam.Images.image) {
      images.push({
        id: uuuid(),
        fileName: image.url,
      });
    }

    return {
      createdAt: new Date(),
      done: false,
      images,
      patientInstance: {
        firstName: p.PatientName,
        lastName: p.PatientName,
        age: p.age ?? 0,
        size: p.size ?? '',
        weight: p.weight ?? 0,
      },
      flow: defaultFlowData(),
      measurements: defaultMeasurements(),
    };
  }

  private static extractPatientId(patientDir: string) {
    return patientDir.split('_')[0];
  }

  private async syncReport(patientPath: string, reportPath: string) {
    const directory = path.join(this._masterDir, patientPath, reportPath);
    const files = await readdir(directory);
    // the reportId is the same as the path
    const patientId = MasterReader.extractPatientId(patientPath);
    const reportId = reportPath;
    const patientXmlFile = files.filter(
      (f) => f.match(`Report_Cardiac${patientId}[0-9]+\\.xml`)?.length
    );

    if (patientXmlFile.length !== 1) {
      Logger.info(
        `No pudo encontrarse el archivo xml para el paciente ${patientId}`,
        files
      );
      throw new ClientException(
        `No puedo encontrarse la informacion del reporte ${reportPath} para el paciente ${patientPath}`
      );
    }
    const patientDataFilePath = path.join(
      this._masterDir,
      patientPath,
      reportPath,
      patientXmlFile[0]
    );

    // Parse and update the patient
    const report = await this.parseReport(patientDataFilePath);

    // copy images
    for (const image of report.images) {
      const from = path.join(
        this._masterDir,
        patientPath,
        reportPath,
        image.fileName
      );
      const imageDir = path.join(
        AppDataDir,
        'patientData',
        patientPath,
        reportPath
      );

      await fs.mkdir(imageDir, {
        recursive: true,
      });
      await fs.copyFile(from, path.join(imageDir, image.fileName));
    }

    const patient = await patientService.patientCreateUpdate(
      patientId,
      report.patientInstance
    );

    return reportService.reportCreate({
      id: reportId,
      patient,
      ...report,
    });
  }

  private static async findDirectories(directory: string) {
    Logger.info('Getting all directories in: ', directory);
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
}
