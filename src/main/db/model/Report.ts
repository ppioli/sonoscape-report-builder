import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Report as IReport } from '../../../shared/model/Report';
import { Patient, PatientInstance } from './Patient';
import { Measurements } from './Measurements';
import { FlujosDoppler } from './FlujosDoppler';
import { Image } from './Image';
import { createDefaultPatient } from '../../../shared/model/Patient';

@Entity()
export class Report implements IReport {
  constructor(props?: IReport, patient?: Patient) {
    this.createdAt = props?.createdAt ?? new Date();
    this.done = props?.done ?? false;
    this.id = props?.id ?? '';
    this.measurements = props?.measurements ?? new Measurements();
    this.patientInstance = props?.patientInstance ?? new PatientInstance();
    this.flow = props?.flow ?? new FlujosDoppler();
    this.patient = patient;
  }

  @Column()
  createdAt: Date;

  @Column()
  done: boolean;

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.reports)
  patient?: Patient;

  @Column(() => PatientInstance)
  patientInstance: PatientInstance;

  @Column(() => Measurements)
  measurements: Measurements;

  @Column(() => FlujosDoppler)
  flow: FlujosDoppler;

  @OneToMany(() => Image, (image) => image.report)
  images!: Image[];
}
