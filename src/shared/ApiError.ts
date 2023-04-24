export interface ApiError {
  message: string;
}

export function createError(e: any): ApiError {
  if (typeof e === 'string') {
    return { message: e };
  }
  return { message: 'An unexpected error occurred' };
}
