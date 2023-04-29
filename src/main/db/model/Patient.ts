import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Report } from './Report';
import { PatientInstance } from './PatientInstance';
import { PatientData } from '../../../shared/model/PatientData';

interface PatientProps extends PatientData {
  id?: string;
  reports: Report[];
}
@Entity()
export class Patient extends PatientInstance {
  constructor(props?: PatientProps) {
    super(props);
    this.id = props?.id ?? uuidv4();
  }

  @PrimaryColumn()
  id: string;

  @OneToMany(() => Report, (report) => report.patient)
  reports!: Report[];
}
