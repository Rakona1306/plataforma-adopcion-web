/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  SHELTER: {
    SPECIE: {
      PUBLIC_GET_ALL: '/v1/species'
    }
  },
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    CONFIRM_EMAIL: '/auth/verify-email',
    CREATE_USER: '/auth/complete-registration'
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