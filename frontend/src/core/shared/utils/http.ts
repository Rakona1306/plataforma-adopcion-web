/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * HTTP Utility Functions
 */

import { LOCAL_STORAGE } from '../constants/local-storage';
import { HttpError } from '../errors/http-error';

/**
 * Build Query String from Object
 */
export function buildQueryString(params: Record<string, any>): string {
  const filtered = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return filtered ? `?${filtered}` : '';
}

/**
 * Parse Query String to Object
 */
export function parseQueryString(queryString: string): Record<string, string> {
  if (!queryString) return {};
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

/**
 * Build Full URL
 */
export function buildUrl(
  baseUrl: string,
  endpoint: string,
  params?: Record<string, any>
): string {
  const url = `${baseUrl}${endpoint}`;
  if (!params) return url;
  return `${url}${buildQueryString(params)}`;
}

/**
 * Default Fetch Options
 */
export function getDefaultHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Get Auth Token from Storage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  const local = localStorage.getItem(LOCAL_STORAGE.NAMESESSION);
  if (!local) return null;
  // Tipado Zustand
  const jsonValue: { state: { token: string } } = JSON.parse(local);
  return jsonValue.state.token;
}

/**
 * Set Auth Token to Storage
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE.NAMESESSION, token);
}

/**
 * Remove Auth Token from Storage
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_STORAGE.NAMESESSION);
}

/**
 * Handle HTTP Error
 */
export async function handleHttpError(
  response: Response
): Promise<never> {

  let message =
    "Error interno del servidor";

  let data: unknown = null;

  try {

    data = await response.json();

    if (
      typeof data === "string"
    ) {

      message = data;

    } else if (
      typeof data === "object" &&
      data !== null &&
      "message" in data
    ) {

      message = String(data.message);

    }

  } catch {

    message =
      response.statusText ||
      message;
  }

  throw new HttpError(
    message,
    response.status,
    data
  );
}