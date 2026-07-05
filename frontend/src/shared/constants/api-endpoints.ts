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
  ADOPTION: {
    CREATE: '/v1/adoptions',
    PAGINATE: '/v1/adoptions',
    REVIEW: (id: string) => `/v1/adoptions/${id}/review`
  }
} as const;