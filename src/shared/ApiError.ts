export interface ApiError {
  message: string;
  code?: ApiErrorCode;
}

export enum ApiErrorCode {
  NOT_CONTENT = 'NO_CONTENT',
}

export function createError(e: any): ApiError {
  if (typeof e === 'string') {
    return { message: e };
  }
  return { message: 'An unexpected error occurred' };
}
