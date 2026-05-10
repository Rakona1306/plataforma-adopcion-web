/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_CONFIG } from '@/shared/constants';
import { RequestConfig } from '@/shared/types';
import { buildUrl, handleHttpError, getDefaultHeaders } from '@/shared/utils/http';

class HttpClient {
  private baseUrl: string;
  private timeout: number;
  private retryCount: number;

  constructor(config = API_CONFIG) {
    this.baseUrl = config.BASE_URL;
    this.timeout = config.TIMEOUT;
    this.retryCount = config.RETRY_COUNT;
  }

  /**
   * Realizar request genérico
   */
  private async request<T>(
    url: string,
    options: RequestInit & { timeout?: number; retry?: boolean },
    retryAttempt = 0
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || this.timeout
    );

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...getDefaultHeaders(),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await handleHttpError(response);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (options.retry && retryAttempt < this.retryCount) {
        // Esperar antes de reintentar (backoff exponencial)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retryAttempt) * 1000)
        );
        return this.request<T>(url, options, retryAttempt + 1);
      }

      throw error;
    }
  }

  /**
   * GET Request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: RequestConfig
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint, params);
    return this.request<T>(url, {
      method: 'GET',
      timeout: config?.timeout,
      retry: config?.retry ?? true,
      headers: config?.headers,
    });
  }

  /**
   * POST Request
   */
  async post<T>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint);
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      timeout: config?.timeout,
      retry: config?.retry,
      headers: config?.headers,
    });
  }

  /**
   * PUT Request
   */
  async put<T>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint);
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      timeout: config?.timeout,
      retry: config?.retry,
      headers: config?.headers,
    });
  }

  /**
   * PATCH Request
   */
  async patch<T>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint);
    return this.request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      timeout: config?.timeout,
      retry: config?.retry,
      headers: config?.headers,
    });
  }

  /**
   * DELETE Request
   */
  async delete<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint);
    return this.request<T>(url, {
      method: 'DELETE',
      timeout: config?.timeout,
      retry: config?.retry,
      headers: config?.headers,
    });
  }
}

// Singleton instance
export const httpClient = new HttpClient();
export default HttpClient;
