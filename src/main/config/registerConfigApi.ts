import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs/promises';
import { ConfigData, defaultConfig } from '../../shared/model/ConfigData';
import { ConfigMessages } from './ConfigMessages';
import { ApiResponse, noResponse, okResponse } from '../../shared/ApiResponse';
import Logger from '../Logger';

export const AppDataDir = path.join(
  app.getPath('appData'),
  'dev-ppioli-cardio-report'
);

const ConfigFilePath = path.join(AppDataDir, 'cardio-report-config.json');
const ensureConfigDirExists = async () => {
  await fs.mkdir(AppDataDir, {
    recursive: true,
  });
};

// TODO Cache this
export const getConfig = async (): Promise<ConfigData> => {
  try {
    await ensureConfigDirExists();
    return await fs
      .readFile(ConfigFilePath, { encoding: 'utf-8' })
      .then((fd) => JSON.parse(fd));
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return defaultConfig();
    }
    throw error;
  }
};
export function registerConfigApi(window: BrowserWindow) {
  ipcMain.handle(
    ConfigMessages.READ,
    async (): Promise<ApiResponse<ConfigData>> => {
      try {
        const config = await getConfig();
        return okResponse(config);
      } catch (error: any) {
        return noResponse(error);
      }
    }
  );
  ipcMain.handle(ConfigMessages.SAVE, async (evt: any, config: ConfigData) => {
    Logger.info('Saving config file', config);
    try {
      await ensureConfigDirExists();
      await fs.writeFile(ConfigFilePath, JSON.stringify(config));
      return okResponse(true);
    } catch (err: any) {
      return noResponse(err);
    }
  });
}
