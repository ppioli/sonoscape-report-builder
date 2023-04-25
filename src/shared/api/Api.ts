import { ConfigApi } from './ConfigApi';
import { PatientApi } from './PatientApi';
import { FileApi } from './FileApi';
import { ReportApi } from './ReportApi';

export interface Api {
  config: ConfigApi;
  patient: PatientApi;
  file: FileApi;
  report: ReportApi;
}
