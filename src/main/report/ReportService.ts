import { FindOptionsWhere, Repository } from 'typeorm';
import { Report, ReportProps } from '../db/model/Report';
import db from '../db/db';
import { ReportData } from '../../shared/model/ReportData';
import { ClientException } from '../exception/ClientException';
import patientService, {
  IPatientService,
  PatientService,
} from './PatientService';
import Logger from '../Logger';
import { Patient } from '../db/model/Patient';
import { fetchPaginated, Page } from '../common/Pagination';
import { PaginatedQuery } from '../common/PaginatedQuery';

export interface IReportService {
  reportGet(id: string): Promise<Report>;

  reportUpdate(id: string, data: ReportData): Promise<Report>;

  reportCreate(data: ReportData, patient: Patient): Promise<Report>;

  reportList(opts: PaginatedQuery<Report>): Promise<Page<Report>>;
}

class ReportService implements IReportService {
  private readonly _repo: Repository<Report>;

  private readonly _patientService: IPatientService;

  constructor() {
    this._repo = db.getRepository(Report);
    this._patientService = new PatientService();
  }

  reportList(opts: PaginatedQuery<Report>): Promise<Page<Report>> {
    return fetchPaginated({
      repository: this._repo,
      ...opts,
    });
  }

  public async reportUpdate(id: string, data: ReportData): Promise<Report> {
    const report = await this.reportGet(id);
    Object.assign(report, data);
    report.done = true;
    await this._repo.save(report);
    return report;
  }

  public async reportGet(id: string): Promise<Report> {
    const report = await this._repo.findOne({
      where: { id },
      relations: {
        images: true,
        patient: true,
      },
    });
    if (!report) {
      throw new ClientException(`Report ${id} not found`);
    }
    return report;
  }

  public async reportExist(id: string): Promise<boolean> {
    return (await this._repo.count({ where: { id } })) > 1;
  }

  public async reportCreate(
    report: ReportData,
    patient: Patient
  ): Promise<Report> {
    Logger.info('Saving report', report);
    const created = new Report({ ...report, patient });
    return this._repo.save(created);
  }
}

const reportService = new ReportService();

export default reportService;
