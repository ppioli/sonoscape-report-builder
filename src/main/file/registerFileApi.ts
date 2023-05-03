import { ipcMain, dialog } from 'electron';
import { FileMessages } from './FileMessages';
import { ApiResponse, noResponse, okResponse } from '../../shared/ApiResponse';
import imageService from '../report/ImageService';

export function registerFileApi() {
  ipcMain.handle(
    FileMessages.SHOW_FILE_PICKER,
    async (): Promise<ApiResponse<string>> => {
      try {
        const selectedValue = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });
        return okResponse(selectedValue.filePaths[0]);
      } catch (error: any) {
        return noResponse(error);
      }
    }
  );
  ipcMain.handle(
    FileMessages.GET_IMAGE_DATA,
    async (_, imageId: string): Promise<ApiResponse<string | null>> => {
      try {
        const image = await imageService.imageGetData(imageId);
        return okResponse(image);
      } catch (error: any) {
        return noResponse(error);
      }
    }
  );
}
