import { Repository } from 'typeorm';
import { Report } from '../db/model/Report';
import db from '../db/db';
import { ReportData } from '../../shared/model/ReportData';
import { ClientException } from '../exception/ClientException';
import { IPatientService, PatientService } from './PatientService';

export interface IReportService {
  reportGet(id: string): Promise<Report>;
  reportUpdate(id: string, data: ReportData): Promise<Report>;
  reportCreate(data: ReportData, patientId: string): Promise<Report>;
  reportList(filter: { done: boolean }): Promise<Report[]>;
}

class ReportService implements IReportService {
  private readonly _repo: Repository<Report>;

  private readonly _patientService: IPatientService;

  constructor() {
    this._repo = db.getRepository(Report);
    this._patientService = new PatientService();
  }

  reportList(filter: any): Promise<Report[]> {
    return this._repo.find({
      where: filter,
      relations: {
        patient: true,
      },
    });
  }

  public async reportUpdate(id: string, data: ReportData): Promise<Report> {
    const report = await this._repo.findOneBy({ id });
    if (!report) {
      throw new ClientException(`Report ${id} not found`);
    }
    Object.assign(report, data);
    await this._repo.save(report);
    return report;
  }

  public async reportGet(id: string): Promise<Report> {
    const report = await this._repo.findOneBy({ id });
    if (!report) {
      throw new ClientException(`Report ${id} not found`);
    }
    return report;
  }

  public async reportCreate(
    data: ReportData,
    patientId: string
  ): Promise<Report> {
    const patient = await this._patientService.patientGet(patientId);
    let report = new Report({ ...data, patient });
    report = await this._repo.save(report);

    return report;
  }
}

const reportService = new ReportService();

export default reportService;
