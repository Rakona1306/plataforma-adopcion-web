/**
 * HTTP Utility Functions
 */

import { API_CONFIG } from '../constants';
import { ApiResponse, ApiError, RequestConfig } from '../types';

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
 * Handle HTTP Error
 */
export async function handleHttpError(response: Response): Promise<never> {
  let errorData: any;
  try {
    errorData = await response.json();
  } catch {
    errorData = { message: response.statusText };
  }

  const error = new ApiError(
    response.status,
    errorData.message || 'An error occurred',
    errorData.errors
  );

  throw error;
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
  return localStorage.getItem('auth_token');
}

/**
 * Set Auth Token to Storage
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

/**
 * Remove Auth Token from Storage
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}
