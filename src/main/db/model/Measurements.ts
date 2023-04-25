import { Measurements as IMeasurement } from '../../../shared/model/Measurements';
import { Column } from 'typeorm';

export class Measurements implements IMeasurement {
  constructor(props?: IMeasurement) {
    this.ad = props?.ad ?? 0;
    this.ai = props?.ai ?? 0;
    this.ao = props?.ao ?? 0;
    this.fa = props?.fa ?? 0;
    this.fey = props?.fey ?? 0;
    this.fa = props?.fa ?? 0;
    this.pposterior = props?.pposterior ?? 0;
    this.pulmon = props?.pulmon ?? 0;
    this.septum = props?.septum ?? 0;
    this.vd = props?.vd ?? 0;
    this.vidd = props?.vidd ?? 0;
    this.vids = props?.vids ?? 0;
    this.auriculaDerecha = props?.auriculaDerecha ?? '';
    this.auriculaIzquierda = props?.auriculaIzquierda ?? '';
    this.ventriculoDerecho = props?.ventriculoDerecho ?? '';
    this.ventriculoIzquierdo = props?.ventriculoIzquierdo ?? '';
    this.pericardio = props?.pericardio ?? '';
    this.valvulaAortica = props?.valvulaAortica ?? '';
    this.valvulaMitral = props?.valvulaMitral ?? '';
    this.valvulaPulmonar = props?.valvulaPulmonar ?? '';
    this.valvulaTricuspidea = props?.valvulaTricuspidea ?? '';
  }

  @Column()
  ad: number;

  @Column()
  ai: number;

  @Column()
  ao: number;

  @Column()
  auriculaDerecha: string;

  @Column()
  auriculaIzquierda: string;

  @Column()
  fa: number;

  @Column()
  fey: number;

  @Column()
  pericardio: string;

  @Column()
  pposterior: number;

  @Column()
  pulmon: number;

  @Column()
  septum: number;

  @Column()
  valvulaAortica: string;

  @Column()
  valvulaMitral: string;

  @Column()
  valvulaPulmonar: string;

  @Column()
  valvulaTricuspidea: string;

  @Column()
  vd: number;

  @Column()
  ventriculoDerecho: string;

  @Column()
  ventriculoIzquierdo: string;

  @Column()
  vidd: number;

  @Column()
  vids: number;
}
