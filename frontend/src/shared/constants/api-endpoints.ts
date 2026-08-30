/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  SHELTER: {
    PET: {
      MOST_REQUESTED: "/pets/most-requested",
    },
    SPECIE: {
      PUBLIC_GET_ALL: "/v1/species",
    },
  },
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
    CONFIRM_EMAIL: "/auth/verify-email",
    CREATE_USER: "/auth/complete-registration",
  },
  // Usuarios
  USERS: {
    LIST: "/api/users",
    GET: (id: string) => `/api/users/${id}`,
    CREATE: "/api/users",
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
    VALIDATE_DNI: (dni: string) => `/users/validate-dni/${dni}`,
  },
  ADOPTION: {
    UPDATE: "/adoptions/status",
    PAGINATE: "/adoptions",
    BY_ID: (id: number) => `/adoptions/${id}`,
  },
  REQUEST_ADOPTION: {
    DELETE: (id: number) => `/request-adoptions/${id}`,
    UPDATE: (id: number) => `/request-adoptions/${id}`,
    CREATE: "/request-adoptions",
    PAGINATE: "/request-adoptions",
    REVIEW: (id: number) => `/request-adoptions/${id}/review`,

    PUBLIC_CREATE: "/v1/request-adoptions",
  },
  ADOPTION_FOLLOW_UP: {
    PAGINATE: "/adoption-follow-ups",
    CREATE: "/adoption-follow-ups",
    UPDATE: (id: number) => `/adoption-follow-ups/${id}`,
    DELETE: (id: number) => `/adoption-follow-ups/${id}`,
    GET_BY_ID: (id: number) => `/adoption-follow-ups/${id}`,
  },
} as const;
