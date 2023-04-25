import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Image as IImage } from '../../../shared/model/Image';
import { Report } from './Report';

@Entity()
export class Image implements IImage {
  constructor(props?: IImage) {
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
