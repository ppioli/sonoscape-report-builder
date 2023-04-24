import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Patient as IPatient } from '../../../shared/model/Patient';
import { Report } from './Report';

@Entity()
export class Patient implements IPatient {
  constructor(props?: Omit<IPatient, 'reports'>) {
    this.id = props?.id ?? '';
    this.firstName = props?.firstName ?? '';
    this.lastName = props?.lastName ?? '';
  }

  @PrimaryColumn()
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @OneToMany(() => Report, (report) => report.patient)
  reports!: Report[];
}
