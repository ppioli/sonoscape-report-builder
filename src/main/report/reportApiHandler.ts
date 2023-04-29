import { ipcRenderer } from 'electron';
import { ApiResponse } from '../../shared/ApiResponse';
import { ReportMessages } from './ReportMessages';
import { ReportApi } from '../../shared/api/ReportApi';
import { ReportData } from '../../shared/model/ReportData';

export const reportApiHandler: ReportApi = {
  read(reportId: string): Promise<ApiResponse<ReportData>> {
    return ipcRenderer.invoke(ReportMessages.READ, reportId);
  },
  save(report: ReportData): Promise<ApiResponse<ReportData>> {
    return ipcRenderer.invoke(ReportMessages.SAVE, report);
  },
  list(param: { pending: boolean }): Promise<ApiResponse<ReportData[]>> {
    return ipcRenderer.invoke(ReportMessages.LIST, param);
  },
};
