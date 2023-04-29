import { ipcRenderer } from 'electron';
import { ApiResponse } from '../../shared/ApiResponse';
import { ConfigMessages } from './ConfigMessages';
import { ConfigApi } from '../../shared/api/ConfigApi';
import { ConfigData } from '../../shared/model/ConfigData';

export const configApiHandler: ConfigApi = {
  read(): Promise<ApiResponse<ConfigData>> {
    return ipcRenderer.invoke(ConfigMessages.READ);
  },
  save(config: ConfigData): Promise<ApiResponse<boolean>> {
    return ipcRenderer.invoke(ConfigMessages.SAVE, config);
  },
};
