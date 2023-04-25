import { Patient } from './Patient';
import { Measurements } from './Measurements';
import { FlujosDoppler } from './FlujosDoppler';
import { Image } from './Image';

export interface Report {
  id: string;
  createdAt: Date;
  done: boolean;
  patientInstance: Patient;
  measurements: Measurements;
  flow: FlujosDoppler;
  images: Image[];
}
