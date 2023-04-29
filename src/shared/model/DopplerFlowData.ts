export interface DopplerFlowData {
  aortico: string;
  mitral: string;
  pulmonar: string;
  tricuspideo: string;
  conclusiones: string;
}

export const defaultFlowData: () => DopplerFlowData = () => ({
  aortico: '',
  conclusiones: '',
  mitral: '',
  pulmonar: '',
  tricuspideo: '',
});
