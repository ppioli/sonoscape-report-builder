import { ipcMain } from 'electron';
import { ReportMessages } from './ReportMessages';
import { ApiResponse, noResponse, okResponse } from '../../shared/ApiResponse';
import Logger from '../Logger';
import { ReportData } from '../../shared/model/ReportData';
import reportService from './ReportService';
import { Report } from '../db/model/Report';
import { Patient } from '../db/model/Patient';
import { PaginatedQuery } from '../common/PaginatedQuery';

export function registerReportApi() {
  ipcMain.handle(
    ReportMessages.READ,
    async (_, reportId: string): Promise<ApiResponse<Report>> => {
      Logger.info('Read report api called', reportId);
      try {
        const report = await reportService.reportGet(reportId);
        Logger.info('Returning ', report);
        return okResponse(report);
      } catch (error: any) {
        return noResponse(error);
      }
    }
  );
  ipcMain.handle(
    ReportMessages.UPDATE,
    async (evt: any, id: string, report: ReportData) => {
      Logger.info('update report file', id, report);
      try {
        const result = await reportService.reportUpdate(id, report);
        return okResponse(result);
      } catch (err: any) {
        return noResponse(err);
      }
    }
  );
  ipcMain.handle(ReportMessages.SAVE, async (evt: any, report: ReportData) => {
    Logger.info('Saving report file', report);
    try {
      // TODO Patient?
      const result = await reportService.reportCreate(report, new Patient());
      return okResponse(result);
    } catch (err: any) {
      return noResponse(err);
    }
  });
  ipcMain.handle(
    ReportMessages.LIST,
    async (evt: any, params: PaginatedQuery<Report>) => {
      Logger.info('Listing reports', params);
      try {
        const result = await reportService.reportList(params);
        Logger.info('List report ok', result);
        return okResponse(result);
      } catch (err: any) {
        return noResponse(err);
      }
    }
  );
}
