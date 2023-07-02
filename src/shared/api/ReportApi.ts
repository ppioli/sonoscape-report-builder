import { ApiResponse } from '../ApiResponse';
import { ReportData } from '../model/ReportData';
import { Report } from '../../main/db/model/Report';
import { PaginatedQuery } from '../../main/common/PaginatedQuery';
import { Page } from '../../main/common/Pagination';

export interface ReportApi {
  read(reportId: string): Promise<ApiResponse<Report>>;
  save(report: ReportData): Promise<ApiResponse<Report>>;
  update(id: string, report: ReportData): Promise<ApiResponse<Report>>;
  list(params: PaginatedQuery<Report>): Promise<ApiResponse<Page<Report>>>;
}
