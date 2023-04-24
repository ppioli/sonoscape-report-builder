import { BrowserWindow, ipcMain } from 'electron';
import { PatientMessages } from './PatientMessages';
import { ApiResponse, noResponse, okResponse } from '../../shared/ApiResponse';
import { Patient } from '../../shared/model/Patient';
import Logger from '../Logger';
import { getConfig } from '../config/registerConfigApi';
import { readMaster } from './syncReports';

let _window: BrowserWindow | null = null;

export function registerPatientApi(window: BrowserWindow) {
  Logger.info('Registering patient api');
  _window = window;
  const startSync = async () => {
    const config = await getConfig();
    await readMaster(config.masterDir, (event) => {
      window.webContents.send(PatientMessages.SYNC_EVENT, event);
    });
  };

  ipcMain.handle(
    PatientMessages.READ,
    async (event: any, patientId: string): Promise<ApiResponse<Patient>> => {
      try {
        const patient: Patient = {
          id: patientId,
          firstName: 'Pablo',
          lastName: 'Pioli',
        };
        return okResponse(patient);
      } catch (error: any) {
        return noResponse(error);
      }
    }
  );

  ipcMain.on(PatientMessages.SYNC_START, () => {
    startSync();
  });
}
