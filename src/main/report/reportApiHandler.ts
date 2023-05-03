import { ipcRenderer } from 'electron';
import { ApiResponse } from '../../shared/ApiResponse';
import { ReportMessages } from './ReportMessages';
import { ReportApi } from '../../shared/api/ReportApi';
import { ReportData } from '../../shared/model/ReportData';
import { Report } from '../db/model/Report';

export const reportApiHandler: ReportApi = {
  read(reportId: string): Promise<ApiResponse<Report>> {
    return ipcRenderer.invoke(ReportMessages.READ, reportId);
  },
  save(report: ReportData): Promise<ApiResponse<Report>> {
    return ipcRenderer.invoke(ReportMessages.SAVE, report);
  },
  list(param: { pending: boolean }): Promise<ApiResponse<Report[]>> {
    return ipcRenderer.invoke(ReportMessages.LIST, param);
  },
};
