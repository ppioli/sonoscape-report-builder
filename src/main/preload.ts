import { contextBridge } from 'electron';
import { configApiHandler } from './config/configApiHandler';
import { Api } from '../shared/api/Api';
import { patientApiHandler } from './patient/patientApiHandler';
import { fileApiHandler } from './file/fileApiHandler';
import { reportApiHandler } from './report/reportApiHandler';

const api: Api = {
  config: configApiHandler,
  patient: patientApiHandler,
  file: fileApiHandler,
  report: reportApiHandler,
};

contextBridge.exposeInMainWorld('electron', api);
