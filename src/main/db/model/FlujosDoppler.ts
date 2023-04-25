import { FlujosDoppler as IFlujosDoppler } from '../../../shared/model/FlujosDoppler';
import { Column } from 'typeorm';

export class FlujosDoppler implements IFlujosDoppler {
  constructor(props?: IFlujosDoppler) {
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
