/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
  },
  // Usuarios
  USERS: {
    LIST: '/api/users',
    GET: (id: string) => `/api/users/${id}`,
    CREATE: '/api/users',
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
  },
  // Reservaciones
  RESERVATIONS: {
    LIST: '/api/reservations',
    GET: (id: string) => `/api/reservations/${id}`,
    CREATE: '/api/reservations',
    UPDATE: (id: string) => `/api/reservations/${id}`,
    DELETE: (id: string) => `/api/reservations/${id}`,
  },
  // Habitaciones
  ROOMS: {
    LIST: '/api/rooms',
    GET: (id: string) => `/api/rooms/${id}`,
  },
} as const;

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const;

/**
 * Query Params
 */
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 1;
