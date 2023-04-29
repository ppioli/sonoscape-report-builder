import { ApiResponse } from '../ApiResponse';
import { ConfigData } from '../model/ConfigData';
import { PatientSyncEvent } from '../responses/PatientSyncEvent';

export type PatientSyncEventCallback = (event: PatientSyncEvent) => void;
export interface PatientApi {
  read(): Promise<ApiResponse<ConfigData>>;
  syncStart(): void;
  syncEvent(callback: PatientSyncEventCallback): void;
}
