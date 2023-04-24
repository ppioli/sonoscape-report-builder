import { ApiResponse } from '../ApiResponse';
import { Config } from '../model/Config';

export interface ConfigApi {
  read(): Promise<ApiResponse<Config>>;
  save(config: Config): Promise<ApiResponse<boolean>>;
}
