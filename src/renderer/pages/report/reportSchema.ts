import {
  string,
  number,
  object,
  ObjectSchema,
  date,
  boolean,
  array,
} from 'yup';
import { Report } from '../../../shared/model/Report';
import { Measurements } from '../../../shared/model/Measurements';
import { FlujosDoppler } from '../../../shared/model/FlujosDoppler';
import { Image } from '../../../shared/model/Image';
import { Patient } from '../../../shared/model/Patient';

const measurementSchema: ObjectSchema<Measurements> = object().shape({
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

const flujosDopplerSchema: ObjectSchema<FlujosDoppler> = object().shape({
  aortico: string().required(),
  mitral: string().required(),
  pulmonar: string().required(),
  tricuspideo: string().required(),
  conclusiones: string().required(),
});

const imageSchema: ObjectSchema<Image> = object().shape({
  id: string().required(),
  fileName: string().required(),
});

const patientInstanceSchema: ObjectSchema<Patient> = object().shape({
  id: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  dni: string().required(),
  age: string().required(),
  weight: number().required(),
  size: string().required(),
});

export const reportSchema: ObjectSchema<Report> = object().shape({
  id: string().required(),
  createdAt: date().required(),
  done: boolean().required(),
  patientInstance: patientInstanceSchema.required(),
  measurements: measurementSchema.required(),
  images: array().of(imageSchema).required(),
  flow: flujosDopplerSchema.required(),
});
