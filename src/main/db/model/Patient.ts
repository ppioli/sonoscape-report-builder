import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Patient as IPatient } from '../../../shared/model/Patient';
import { Report } from './Report';

@Entity()
export class PatientInstance implements IPatient {
  constructor(props?: Omit<IPatient, 'reports'>) {
    this.id = props?.id ?? '';
    this.firstName = props?.firstName ?? '';
    this.lastName = props?.lastName ?? '';
    this.dni = props?.dni ?? '';
    this.weight = props?.weight ?? 0;
    this.age = props?.age ?? '';
    this.size = props?.size ?? '';
  }

  @PrimaryColumn()
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  dni: string;

  @Column()
  age: string;

  @Column()
  weight: number;

  @Column()
  size: string;
}

@Entity()
export class Patient extends PatientInstance {
  @OneToMany(() => Report, (report) => report.patient)
  reports!: Report[];
}
