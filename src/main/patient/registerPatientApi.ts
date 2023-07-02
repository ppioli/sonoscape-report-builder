import { BrowserWindow, ipcMain } from 'electron';
import { PatientMessages } from './PatientMessages';
import { ApiResponse } from '../../shared/ApiResponse';
import { PatientData } from '../../shared/model/PatientData';
import Logger from '../Logger';
import { getConfig } from '../config/registerConfigApi';
import { MasterReader } from './masterReader';
import { ClientException } from '../exception/ClientException';

let _window: BrowserWindow | null = null;

export function registerPatientApi(window: BrowserWindow) {
  Logger.info('Registering patient api');
  _window = window;
  const startSync = async () => {
    const config = await getConfig();
    const reader = new MasterReader(config.masterDir);
    for (let i = 1; i < 100; i++) {
      await reader.readMaster((event) => {
        window.webContents.send(PatientMessages.SYNC_EVENT, event);
      });
    }
  };

  ipcMain.handle(
    PatientMessages.READ,
    async (
      event: any,
      patientId: string
    ): Promise<ApiResponse<PatientData>> => {
      throw new ClientException('Not implemented');
    }
  );

  ipcMain.on(PatientMessages.SYNC_START, () => {
    startSync();
  });
}
