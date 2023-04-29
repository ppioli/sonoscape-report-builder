import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ImageData } from '../../../shared/model/ImageData';
import { Report } from './Report';

@Entity()
export class Image implements ImageData {
  constructor(props?: ImageData) {
    this.id = props?.id ?? '';
    this.fileName = props?.fileName ?? '';
  }

  @PrimaryColumn()
  id: string;

  @Column()
  fileName: string;

  @ManyToOne(() => Report, (report) => report.images)
  report!: Report;
}
