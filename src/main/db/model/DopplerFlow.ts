import { Column } from 'typeorm';
import { DopplerFlowData } from '../../../shared/model/DopplerFlowData';

export class DopplerFlow implements DopplerFlowData {
  constructor(props?: DopplerFlowData) {
    this.aortico = props?.aortico ?? '';
    this.conclusiones = props?.conclusiones ?? '';
    this.mitral = props?.mitral ?? '';
    this.pulmonar = props?.pulmonar ?? '';
    this.tricuspideo = props?.tricuspideo ?? '';
  }

  @Column()
  aortico: string;

  @Column()
  conclusiones: string;

  @Column()
  mitral: string;

  @Column()
  pulmonar: string;

  @Column()
  tricuspideo: string;
}
