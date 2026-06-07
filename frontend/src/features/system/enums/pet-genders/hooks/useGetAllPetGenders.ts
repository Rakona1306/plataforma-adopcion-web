import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { petGendersService } from "../services/pet-genders.service";
import { PetGenders } from "../model/pet-genders.model";

export const petGendersKeys = {
  all: ["enums", "pet-genders"] as const,
};

export function useGetAllPetGenders(): UseQueryResult<PetGenders[], Error> {
  const router = useRouter();

  const query = useQuery({
    queryKey: petGendersKeys.all,
    queryFn: () => petGendersService.getAll(),
    
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    gcTime: 1000 * 60 * 60 * 24,    // 24 horas en caché
  });

  useEffect(() => {
    if (query.isError && query.error) {
      
      const error = query.error as any;
      const statusCode = error?.status || error?.response?.status;
      
      if (statusCode === 401) {
        router.replace("/login");
      }
    }
  }, [query.isError, query.error, router]);

  return query;
}