import { ConfigApi } from './ConfigApi';
import { PatientApi } from './PatientApi';
import { FileApi } from './FileApi';

export interface Api {
  config: ConfigApi;
  patient: PatientApi;
  file: FileApi;
}
