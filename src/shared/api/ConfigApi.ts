import { ApiResponse } from '../ApiResponse';
import { ConfigData } from '../model/ConfigData';

export interface ConfigApi {
  read(): Promise<ApiResponse<ConfigData>>;
  save(config: ConfigData): Promise<ApiResponse<boolean>>;
}
