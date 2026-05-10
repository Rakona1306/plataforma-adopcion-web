/**
 * useFetch Hook - Capa de Aplicación
 * Hook genérico para fetching de datos
 * Patrón: Composable Hook para reutilizable
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { ApiError } from '@/shared/types';

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

type FetchFunction<T> = () => Promise<T>;

interface UseFetchOptions {
  immediate?: boolean;
  retry?: number;
  onSuccess?: <T>(data: T) => void;
  onError?: (error: Error) => void;
}

export function useFetch<T>(
  fetchFn: FetchFunction<T>,
  options: UseFetchOptions = {}
) {
  const { immediate = true, retry = 0, onSuccess, onError } = options;
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Ejecutar fetch
   */
  const execute = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const data = await fetchFn();
      setState({ data, isLoading: false, error: null });
      onSuccess?.(data);
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'An error occurred';
      setState({ data: null, isLoading: false, error: errorMessage });
      onError?.(error as Error);

      // Retry logic
      if (retryCount < retry) {
        setRetryCount((prev) => prev + 1);
        setTimeout(execute, 1000 * Math.pow(2, retryCount));
      }
    }
  }, [fetchFn, retry, retryCount, onSuccess, onError]);

  /**
   * Refetch data
   */
  const refetch = useCallback(() => {
    setRetryCount(0);
    execute();
  }, [execute]);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
    setRetryCount(0);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    refetch,
    reset,
  };
}
