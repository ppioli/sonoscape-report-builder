import { Repository } from 'typeorm';
import { Patient } from '../db/model/Patient';
import db from '../db/db';
import { ClientException } from '../exception/ClientException';
import { PatientData } from '../../shared/model/PatientData';
import Logger from '../Logger';

export interface IPatientService {
  patientGet(id: string): Promise<Patient>;

  patientCreateUpdate(id: string, data: PatientData): Promise<Patient>;
}

export class PatientService implements IPatientService {
  private readonly _repo: Repository<Patient>;

  constructor() {
    this._repo = db.getRepository(Patient);
  }

  public async patientGet(id: string) {
    const patient = await this._repo.findOneBy({ id });
    if (patient == null) {
      throw new ClientException(`Patient ${id} not found`);
    }

    return patient;
  }

  public async patientCreateUpdate(
    id: string,
    data: PatientData
  ): Promise<Patient> {
    Logger.info('Creating or updating new patient with id, data: ', id, data);
    if (!id) {
      throw new ClientException('Invalid id');
    }
    let patient = await this._repo.findOne({ where: { id } });
    if (!patient) {
      patient = new Patient({
        ...data,
        id,
        reports: [],
      });
    } else {
      Object.assign(patient, data);
    }

    return this._repo.save(patient);
  }
}

const patientService = new PatientService();
export default patientService;
