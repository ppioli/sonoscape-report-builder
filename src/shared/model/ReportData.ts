import { PatientData } from './PatientData';
import { MeasurementsData } from './MeasurementsData';
import { DopplerFlowData } from './DopplerFlowData';
import { ImageData } from './ImageData';

export interface ReportData {
  createdAt: Date;
  done: boolean;
  patientInstance: PatientData;
  measurements: MeasurementsData;
  flow: DopplerFlowData;
  images: ImageData[];
}
