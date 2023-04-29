import { ipcRenderer } from 'electron';
import { ApiResponse } from '../../shared/ApiResponse';
import { FileMessages } from './FileMessages';
import { FileApi } from '../../shared/api/FileApi';

export const fileApiHandler: FileApi = {
  getImage(imageId: string): Promise<ApiResponse<string>> {
    return ipcRenderer.invoke(FileMessages.GET_IMAGE_DATA, imageId);
  },
  showDirectoryPicker(): Promise<ApiResponse<string>> {
    return ipcRenderer.invoke(FileMessages.SHOW_FILE_PICKER);
  },
};
