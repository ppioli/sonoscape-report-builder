import {
  string,
  number,
  object,
  ObjectSchema,
  date,
  boolean,
  array,
} from 'yup';
import { ReportData } from '../../../shared/model/ReportData';
import { MeasurementsData } from '../../../shared/model/MeasurementsData';
import { DopplerFlowData } from '../../../shared/model/DopplerFlowData';
import { ImageData } from '../../../shared/model/ImageData';
import { PatientData } from '../../../shared/model/PatientData';

const measurementSchema: ObjectSchema<MeasurementsData> = object().shape({
  ao: number().defined(),
  ai: number().defined(),
  vidd: number().defined(),
  vids: number().defined(),
  fa: number().defined(),
  septum: number().defined(),
  pposterior: number().defined(),
  vd: number().defined(),
  ad: number().defined(),
  pulmon: number().defined(),
  fey: number().defined(),
  ventriculoIzquierdo: string().defined(),
  ventriculoDerecho: string().defined(),
  auriculaDerecha: string().defined(),
  auriculaIzquierda: string().defined(),
  valvulaAortica: string().defined(),
  valvulaMitral: string().defined(),
  valvulaPulmonar: string().defined(),
  valvulaTricuspidea: string().defined(),
  pericardio: string().defined(),
});

const flujosDopplerSchema: ObjectSchema<DopplerFlowData> = object().shape({
  aortico: string().defined(),
  mitral: string().defined(),
  pulmonar: string().defined(),
  tricuspideo: string().defined(),
  conclusiones: string().defined(),
});

const imageSchema: ObjectSchema<ImageData> = object().shape({
  id: string().defined(),
  fileName: string().defined(),
});

const patientInstanceSchema: ObjectSchema<PatientData> = object().shape({
  firstName: string().defined(),
  lastName: string().defined(),
  age: string().defined(),
  weight: number().defined(),
  size: string().defined(),
});

export const reportSchema: ObjectSchema<ReportData> = object().shape({
  id: string().defined(),
  createdAt: date().defined(),
  done: boolean().defined(),
  patientInstance: patientInstanceSchema.defined(),
  measurements: measurementSchema.defined(),
  images: array().of(imageSchema).defined(),
  flow: flujosDopplerSchema.defined(),
});
