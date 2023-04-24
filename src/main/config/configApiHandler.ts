import { ipcRenderer } from 'electron';
import { ApiResponse } from '../../shared/ApiResponse';
import { ConfigMessages } from './ConfigMessages';
import { ConfigApi } from '../../shared/api/ConfigApi';
import { Config } from '../../shared/model/Config';

export const configApiHandler: ConfigApi = {
  read(): Promise<ApiResponse<Config>> {
    return ipcRenderer.invoke(ConfigMessages.READ);
  },
  save(config: Config): Promise<ApiResponse<boolean>> {
    return ipcRenderer.invoke(ConfigMessages.SAVE, config);
  },
};
