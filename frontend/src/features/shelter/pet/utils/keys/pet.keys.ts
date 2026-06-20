// src/core/services/pets/pet.keys.ts
export const petKeys = {
  all: ['pets'] as const,
  lists: () => [...petKeys.all, 'list'] as const,
  details: () => [...petKeys.all, 'detail'] as const,
  detail: (id: string) => [...petKeys.details(), id] as const,
};