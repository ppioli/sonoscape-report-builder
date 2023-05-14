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

export interface ReportProps extends ReportData {
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
    if (props?.images) {
      this.images = props.images.map((i) => {
        return new Image(i);
      });
    }
  }

  @Column()
  createdAt: Date;

  @Column()
  done: boolean;

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.reports)
  patient: Patient;

  @Column(() => PatientInstance)
  patientInstance: PatientInstance;

  @Column(() => Measurements)
  measurements: Measurements;

  @Column(() => DopplerFlow)
  flow: DopplerFlow;

  @OneToMany(() => Image, (image) => image.report, { cascade: true })
  images!: Image[];
}
