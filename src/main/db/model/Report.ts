import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  ReportData,
  ReportData as IReport,
} from '../../../shared/model/ReportData';
import { Patient } from './Patient';
import { Measurements } from './Measurements';
import { DopplerFlow } from './DopplerFlow';
import { Image } from './Image';
import { PatientInstance } from './PatientInstance';

interface ReportProps extends ReportData {
  id?: string;
  patient: Patient;
}
@Entity()
export class Report implements IReport {
  constructor(props?: ReportProps) {
    this.createdAt = props?.createdAt ?? new Date();
    this.done = props?.done ?? false;
    this.id = props?.id ?? uuidv4();
    this.measurements = props?.measurements ?? new Measurements();
    this.patientInstance = props?.patientInstance ?? new PatientInstance();
    this.flow = props?.flow ?? new DopplerFlow();
    this.patient = props?.patient ?? new Patient();
    this.patientId = this.patient.id;
  }

  @Column()
  createdAt: Date;

  @Column()
  done: boolean;

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.reports)
  patient: Patient;

  patientId: string;

  @Column(() => PatientInstance)
  patientInstance: PatientInstance;

  @Column(() => Measurements)
  measurements: Measurements;

  @Column(() => DopplerFlow)
  flow: DopplerFlow;

  @OneToMany(() => Image, (image) => image.report)
  images!: Image[];
}
