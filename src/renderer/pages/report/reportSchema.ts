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
  ao: number().required(),
  ai: number().required(),
  vidd: number().required(),
  vids: number().required(),
  fa: number().required(),
  septum: number().required(),
  pposterior: number().required(),
  vd: number().required(),
  ad: number().required(),
  pulmon: number().required(),
  fey: number().required(),
  ventriculoIzquierdo: string().required(),
  ventriculoDerecho: string().required(),
  auriculaDerecha: string().required(),
  auriculaIzquierda: string().required(),
  valvulaAortica: string().required(),
  valvulaMitral: string().required(),
  valvulaPulmonar: string().required(),
  valvulaTricuspidea: string().required(),
  pericardio: string().required(),
});

const flujosDopplerSchema: ObjectSchema<DopplerFlowData> = object().shape({
  aortico: string().required(),
  mitral: string().required(),
  pulmonar: string().required(),
  tricuspideo: string().required(),
  conclusiones: string().required(),
});

const imageSchema: ObjectSchema<ImageData> = object().shape({
  id: string().required(),
  fileName: string().required(),
});

const patientInstanceSchema: ObjectSchema<PatientData> = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  age: string().required(),
  weight: number().required(),
  size: string().required(),
});

export const reportSchema: ObjectSchema<ReportData> = object().shape({
  id: string().required(),
  createdAt: date().required(),
  done: boolean().required(),
  patientInstance: patientInstanceSchema.required(),
  measurements: measurementSchema.required(),
  images: array().of(imageSchema).required(),
  flow: flujosDopplerSchema.required(),
});
