import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Report as IReport } from '../../../shared/model/Report';
import { Patient } from './Patient';

@Entity()
export class Report implements IReport {
  constructor(props?: IReport) {
    this.createdAt = props?.createdAt ?? new Date();
    this.done = props?.done ?? false;
    this.id = props?.id ?? '';
  }

  @Column()
  createdAt: Date;

  @Column()
  done: boolean;

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.reports)
  patient?: Patient;
}
