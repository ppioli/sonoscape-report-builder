export interface PatientSyncEvent {
  patientId: string;
  reportId: string;
  status: PatientSyncEventStatus;
}

export enum PatientSyncEventStatus {
  DONE,
  EXISTING,
  ERROR,
}
