import { BrowserWindow, ipcMain } from 'electron';
import fs from 'fs/promises';
import { randomUUID } from 'crypto'; // Added in: node v14.17.0
import { Config } from '../../shared/model/Config';
import { ReportMessages } from './ReportMessages';
import {
  ApiResponse,
  noContentResponse,
  noResponse,
  okResponse,
} from '../../shared/ApiResponse';
import Logger from '../Logger';
import { Report as IReport } from '../../shared/model/Report';
import db from '../db/db';
import { Report } from '../db/model/Report';

export function registerReportApi(window: BrowserWindow) {
  const _window = window;
  const _reportRepository = db.getRepository(Report);
  ipcMain.handle(
    ReportMessages.READ,
    async (_, reportId: string): Promise<ApiResponse<IReport>> => {
      Logger.info('Read report api called', reportId);
      try {
        const report = await _reportRepository.findOneBy({ id: reportId });
        if (!report) {
          return noContentResponse();
        }
        return okResponse(report);
      } catch (error: any) {
        return noResponse(error);
      }
    }
  );
  ipcMain.handle(ReportMessages.SAVE, async (evt: any, report: IReport) => {
    Logger.info('Saving report file', report);
    try {
      if (!report.id) {
        report.id = randomUUID();
      }
      const result = await _reportRepository.save(report);
      return okResponse(result);
    } catch (err: any) {
      return noResponse(err);
    }
  });
  ipcMain.handle(ReportMessages.LIST, async (evt: any, params) => {
    Logger.info('Listing reports', params);
    try {
      const filter = params.pending ? { done: false } : {};
      const result = await _reportRepository.find({
        where: filter,
        relations: {
          patient: true,
        },
      });
      return okResponse(result);
    } catch (err: any) {
      return noResponse(err);
    }
  });
}
