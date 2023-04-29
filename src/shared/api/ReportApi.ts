import { ApiResponse } from '../ApiResponse';
import { ReportData } from '../model/ReportData';
import { Report } from '../../main/db/model/Report';

export interface ReportApi {
  read(reportId: string): Promise<ApiResponse<Report>>;
  save(report: ReportData): Promise<ApiResponse<Report>>;
  list(params: { pending: boolean }): Promise<ApiResponse<Report[]>>;
}
