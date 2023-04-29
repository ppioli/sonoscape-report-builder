import { Column, Entity } from 'typeorm';
import {
  PatientData as IPatient,
  PatientData,
} from '../../../shared/model/PatientData';

@Entity()
export class PatientInstance implements PatientData {
  constructor(data?: IPatient) {
    this.firstName = data?.firstName ?? '';
    this.lastName = data?.lastName ?? '';
    this.weight = data?.weight ?? 0;
    this.age = data?.age ?? '';
    this.size = data?.size ?? '';
  }

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  age: string;

  @Column()
  weight: number;

  @Column()
  size: string;
}
