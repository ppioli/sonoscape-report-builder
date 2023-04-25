import { ApiError, ApiErrorCode, createError } from './ApiError';

export type ApiResponse<T> = ApiError | { value: T };

export function okResponse<T>(value: T) {
  return {
    value,
  };
}

export function noResponse(error: ApiError): ApiResponse<any> {
  return createError(error);
}

export function noContentResponse() {
  return createError({
    errorCode: ApiErrorCode.NOT_CONTENT,
    message: 'The content you were looking for cannot be found',
  });
}
export function isApiError(value: ApiResponse<any>): value is ApiError {
  return (value as ApiError).message !== undefined;
}
