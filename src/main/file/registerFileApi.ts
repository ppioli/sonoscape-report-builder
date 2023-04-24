import { BrowserWindow, ipcMain, dialog } from 'electron';
import { FileMessages } from './FileMessages';
import { ApiResponse, noResponse, okResponse } from '../../shared/ApiResponse';

export function registerFileApi(window: BrowserWindow) {
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
}
