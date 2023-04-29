import { Repository } from 'typeorm';
import { Patient } from '../db/model/Patient';
import db from '../db/db';
import { ClientException } from '../exception/ClientException';

export interface IPatientService {
  patientGet(id: string): Promise<Patient>;
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
}
