/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { ApiError } from '../shared/ApiError';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}


export function processError( error: any ) : ApiError {
  logError(error);
  if( typeof error == 'string') {
    return { error }
  } else {
    // TODO improve error handling
    return { error: error.toString()}
  }
}

function logError( error: any ) {
  console.log(error)
}
