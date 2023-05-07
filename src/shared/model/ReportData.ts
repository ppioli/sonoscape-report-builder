import { defaultPatient, PatientData } from './PatientData';
import { defaultMeasurements, MeasurementsData } from './MeasurementsData';
import { defaultFlowData, DopplerFlowData } from './DopplerFlowData';
import { ImageData } from './ImageData';

export interface ReportData {
  createdAt: Date;
  done: boolean;
  patientInstance: PatientData;
  measurements: MeasurementsData;
  flow: DopplerFlowData;
  images: ImageData[];
}

export const defaultReport: () => ReportData = () => ({
  createdAt: new Date(),
  images: [],
  done: false,
  patientInstance: defaultPatient(),
  measurements: defaultMeasurements(),
  flow: defaultFlowData(),
});
