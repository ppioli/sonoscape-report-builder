import { ApiResponse } from '../ApiResponse';
import { Report } from '../model/Report';

export interface ReportApi {
  read(reportId: string): Promise<ApiResponse<Report>>;
  save(report: Report): Promise<ApiResponse<Report>>;
  list(params: { pending: boolean }): Promise<ApiResponse<Report[]>>;
}
