export interface PatientData {
  firstName: string;
  lastName: string;
  age: string;
  weight: number;
  size: string;
}

export const defaultPatient: () => PatientData = () => ({
  firstName: '',
  lastName: '',
  age: '',
  weight: 0,
  size: '',
});
