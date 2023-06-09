import { ipcRenderer } from 'electron';
import ReactPDF from '@react-pdf/renderer';
import { ApiResponse } from '../../shared/ApiResponse';
import { ReportMessages } from './ReportMessages';
import { ReportApi } from '../../shared/api/ReportApi';
import { ReportData } from '../../shared/model/ReportData';
import { Report } from '../db/model/Report';
import { Page } from '../common/Pagination';
import { PaginatedQuery } from '../common/PaginatedQuery';

export const reportApiHandler: ReportApi = {
  read(reportId: string): Promise<ApiResponse<Report>> {
    return ipcRenderer.invoke(ReportMessages.READ, reportId);
  },
  save(report: ReportData): Promise<ApiResponse<Report>> {
    return ipcRenderer.invoke(ReportMessages.SAVE, report);
  },
  update(id: string, report: ReportData): Promise<ApiResponse<Report>> {
    return ipcRenderer.invoke(ReportMessages.UPDATE, id, report);
  },
  list(param: PaginatedQuery<Report>): Promise<ApiResponse<Page<Report>>> {
    return ipcRenderer.invoke(ReportMessages.LIST, param);
  },
};
