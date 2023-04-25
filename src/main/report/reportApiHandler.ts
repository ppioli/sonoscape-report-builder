import { ipcRenderer } from 'electron';
import { ApiResponse } from '../../shared/ApiResponse';
import { ReportMessages } from './ReportMessages';
import { ReportApi } from '../../shared/api/ReportApi';
import { Report } from '../../shared/model/Report';

export const reportApiHandler: ReportApi = {
  read(reportId: string): Promise<ApiResponse<Report>> {
    return ipcRenderer.invoke(ReportMessages.READ, reportId);
  },
  save(report: Report): Promise<ApiResponse<Report>> {
    return ipcRenderer.invoke(ReportMessages.SAVE, report);
  },
  list(param: { pending: boolean }): Promise<ApiResponse<Report[]>> {
    return ipcRenderer.invoke(ReportMessages.LIST, param);
  },
};
