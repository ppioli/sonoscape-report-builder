import { ipcRenderer } from 'electron';
import { ApiResponse } from '../../shared/ApiResponse';
import { PatientMessages } from './PatientMessages';
import { ConfigData } from '../../shared/model/ConfigData';
import { PatientApi } from '../../shared/api/PatientApi';
import { PatientSyncEvent } from '../../shared/responses/PatientSyncEvent';

export const patientApiHandler: PatientApi = {
  read(): Promise<ApiResponse<ConfigData>> {
    return ipcRenderer.invoke(PatientMessages.READ);
  },
  syncStart() {
    return ipcRenderer.send(PatientMessages.SYNC_START);
  },
  syncEvent(callback) {
    return ipcRenderer.on(
      PatientMessages.SYNC_EVENT,
      (event, args: PatientSyncEvent) => callback(args)
    );
  },
};
