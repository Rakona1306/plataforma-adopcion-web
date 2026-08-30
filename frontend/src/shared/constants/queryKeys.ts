export const QUERY_KEYS = {
  SHELTER: {
    PET_VACCINE: "pet-vaccine",
    PET: {
      PUBLIC: "public_pets",
      PRIVATE: "pets",
      MOST_REQUESTED: "most-requested-pets",
    },
    ROLE_PERMISSION: "role-permissions",
    PET_PHOTO: "pet-photos",
    BREED: "breed",
    SPECIE: {
      PUBLIC: "public_species",
      PRIVATE: "species",
    },
  },
  ORGANIZATION: {
    ROLE: "roles",
    USER: {
      VALIDATE_DNI: "validate-dni",
    },
  },
  SYSTEM: {
    AUTH: "profile",
  },
  BUSINESS: {
    ADOPTION: {
      ALL: "adoption",
      REQUEST: "adoption-request",
    },
    REQUEST_ADOPTION: {
      PAGINATE: "request-adoption-paginate",
    },
  },
};
