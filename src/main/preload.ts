import { contextBridge } from 'electron';
import { configApiHandler } from './config/configApiHandler';
import { Api } from '../shared/api/Api';
import { patientApiHandler } from './patient/patientApiHandler';
import { fileApiHandler } from './file/fileApiHandler';

const api: Api = {
  config: configApiHandler,
  patient: patientApiHandler,
  file: fileApiHandler,
};

contextBridge.exposeInMainWorld('electron', api);
