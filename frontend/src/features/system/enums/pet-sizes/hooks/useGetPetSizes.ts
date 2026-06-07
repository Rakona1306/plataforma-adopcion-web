import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PetSizes } from "../model/pet-sizes.model";
import { petSizesService } from "../services/pet-sizes-service";

export const petSizesKeys = {
  all: ["enums", "pet-sizes"] as const,
};

export function useGetPetSizes(): UseQueryResult<PetSizes[], Error> {
  const router = useRouter();

  const query = useQuery({
    queryKey: petSizesKeys.all,
    queryFn: () => petSizesService.getAll(),
    
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
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