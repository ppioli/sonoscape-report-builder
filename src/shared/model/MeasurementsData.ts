export interface MeasurementsData {
  ao: number;
  ai: number;
  vidd: number;
  vids: number;
  fa: number;
  septum: number;
  pposterior: number;
  vd: number;
  ad: number;
  pulmon: number;
  fey: number;

  ventriculoIzquierdo: string;
  ventriculoDerecho: string;
  auriculaDerecha: string;
  auriculaIzquierda: string;
  valvulaAortica: string;
  valvulaMitral: string;
  valvulaPulmonar: string;
  valvulaTricuspidea: string;
  pericardio: string;
}

export const defaultMeasurements: () => MeasurementsData = () => ({
  ad: 0,
  ai: 0,
  ao: 0,
  fey: 0,
  vidd: 0,
  vids: 0,
  vd: 0,
  fa: 0,
  pulmon: 0,
  septum: 0,
  pposterior: 0,
  pericardio: '',
  auriculaIzquierda: '',
  auriculaDerecha: '',
  valvulaAortica: '',
  valvulaMitral: '',
  valvulaPulmonar: '',
  valvulaTricuspidea: '',
  ventriculoDerecho: '',
  ventriculoIzquierdo: '',
});
