import { URL } from 'url';
import path from 'path';
import { ApiError } from '../shared/ApiError';
import Logger from './Logger';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export const isNodeError = (err: unknown): err is Error => err instanceof Error;

function logError(error: any) {
  Logger.error(error);
}

export function processError(error: any): ApiError {
  logError(error);
  if (typeof error === 'string') {
    return { message: error };
  }
  // TODO improve error handling
  return { message: error.toString() };
}
