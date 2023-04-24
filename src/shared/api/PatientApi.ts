import { ApiResponse } from '../ApiResponse';
import { Config } from '../model/Config';
import { PatientSyncEvent } from '../responses/PatientSyncEvent';

export type PatientSyncEventCallback = (event: PatientSyncEvent) => void;
export interface PatientApi {
  read(): Promise<ApiResponse<Config>>;
  syncStart(): void;
  syncEvent(callback: PatientSyncEventCallback): void;
}
