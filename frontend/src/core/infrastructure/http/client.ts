/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_CONFIG } from "@/core/shared/constants";
import { LOCAL_STORAGE } from "@/core/shared/constants/local-storage";
import { RequestConfig } from "@/core/shared/types";

import { buildUrl, getDefaultHeaders } from "@/core/shared/utils/http";

// Error custom que conserva el JSON completo de la respuesta de error
export class HttpError<T = any> extends Error {
  public status: number;
  public data: T | null;
  public response: Response;

  constructor(status: number, message: string, data: T | null, response: Response) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;
    this.response = response;
  }
}

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
        // Intentamos parsear el body del error como JSON.
        // Usamos clone() por si algo más adelante necesita leer el body original.
        let errorData: any = null;

        try {
          errorData = await response.clone().json();
        } catch {
          // El body no era JSON válido (o estaba vacío) -> lo dejamos null
          errorData = null;
        }

        const message =
          errorData?.message ??
          errorData?.error ??
          response.statusText ??
          `HTTP Error ${response.status}`;

        throw new HttpError(response.status, message, errorData, response);
      }

      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      // Si es un error HTTP ya "conocido" (tiene status), no reintentamos por defecto
      // salvo que quieras reintentar también en errores 5xx. Ajustable según necesidad.
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

      body: isFormData ? body : JSON.stringify(body),

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

      body: isFormData ? body : JSON.stringify(body),

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