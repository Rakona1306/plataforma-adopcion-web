/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_CONFIG } from "@/core/shared/constants";
import { LOCAL_STORAGE } from "@/core/shared/constants/local-storage";
import { RequestConfig } from "@/core/shared/types";


import {
  buildUrl,
  getDefaultHeaders,
  handleHttpError,
} from "@/core/shared/utils/http";

class HttpClient {
  private baseUrl: string;

  private timeout: number;

  private retryCount: number;

  constructor(config = API_CONFIG) {
    this.baseUrl = config.BASE_URL;

    this.timeout = config.TIMEOUT;

    this.retryCount = config.RETRY_COUNT;
  }

  private async request<T>(
    url: string,

    options: RequestInit & {
      timeout?: number;
      retry?: boolean;
    },

    retryAttempt = 0,
  ): Promise<T> {
    let token = null;
    const storageToken =
      typeof window !== "undefined"
        ? localStorage.getItem(LOCAL_STORAGE.NAMESESSION)
        : null;

    if (storageToken) {
      const rawState = JSON.parse(storageToken || "{}");

      token = rawState.state.token;
    }

    const headers = {
      ...getDefaultHeaders(),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    if (options.body instanceof FormData) {
      delete (headers as any)["Content-Type"];
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || this.timeout,
    );

    try {
      const response = await fetch(url, {
        ...options,
        cache: "no-store",

        signal: controller.signal,

        credentials: "include",

        headers,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await handleHttpError(response);
      }

      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (options.retry && retryAttempt < this.retryCount) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retryAttempt) * 1000),
        );

        return this.request<T>(url, options, retryAttempt + 1);
      }

      throw error;
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: RequestConfig,
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint, params);

    return this.request<T>(url, {
      method: "GET",

      timeout: config?.timeout,

      retry: config?.retry ?? false,

      headers: config?.headers,
    });
  }

  async post<T>(
    endpoint: string,
    body?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint);

    const isFormData = body instanceof FormData;

    return this.request<T>(url, {
      method: "POST",

      body: JSON.stringify(body),

      timeout: config?.timeout,

      retry: config?.retry ?? false,

      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...config?.headers,
      },
    });
  }

  async put<T>(
    endpoint: string,
    body?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint);

    const isFormData = body instanceof FormData;

    return this.request<T>(url, {
      method: "PUT",

      body: JSON.stringify(body),

      timeout: config?.timeout,

      retry: config?.retry ?? false,

      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...config?.headers,
      },
    });
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint);

    return this.request<T>(url, {
      method: "PATCH",

      body: JSON.stringify(body),

      timeout: config?.timeout,

      retry: config?.retry ?? false,

      headers: config?.headers,
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint);

    return this.request<T>(url, {
      method: "DELETE",

      timeout: config?.timeout,

      retry: config?.retry ?? false,

      headers: config?.headers,
    });
  }
}

export const httpClient = new HttpClient();

export default HttpClient;
