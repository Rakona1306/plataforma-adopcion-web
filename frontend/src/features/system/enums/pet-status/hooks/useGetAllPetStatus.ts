import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { PetStatus } from "../model/pet-status.model";
import { petStatusService } from "../services/pet-status.service";

export const petStatusKeys = {
  all: ["enums", "pet-status"] as const,
};

export function useGetAllPetStatus(): UseQueryResult<PetStatus[], Error> {
  const router = useRouter();

  const query = useQuery({
    queryKey: petStatusKeys.all,
    queryFn: () => petStatusService.getAll(),
    
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