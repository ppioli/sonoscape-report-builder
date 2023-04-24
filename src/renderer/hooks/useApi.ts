import { DependencyList, useEffect, useState } from 'react';
import { Api } from '../../shared/api/Api';
import { ApiError, createError } from '../../shared/ApiError';
import { api } from '../api';
import { ApiResponse, isApiError } from '../../shared/ApiResponse';

export interface UseApiProps {}

export type ApiFunc<T> = (api: Api) => Promise<ApiResponse<T>>;

export function useApi<T>(func: ApiFunc<T>, deps: DependencyList) {
  const [error, setError] = useState<ApiError | null>(null);
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setError(null);
      setValue(null);
      setLoading(true);
      func(api)
        .then((response) => {
          if (isApiError(response)) {
            setError(response);
          } else {
            setValue(response.value);
          }
          return true;
        })
        .catch((e) => setError(e));
    } catch (e) {
      setError(createError(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    error,
    value,
    loading,
  };
}
