"use client";

import { useQuery } from "@tanstack/react-query";
import { petKeys } from "../utils/keys/pet.keys";
import { petService } from "../services/pet.service";
import { useRouter } from "next/navigation";

export function useGetByIdPet(id: string) {
  const router = useRouter();

  const query = useQuery({
    // La llave cambia automáticamente cuando el ID cambia
    queryKey: petKeys.detail(id),
    
    // Ejecuta la llamada al servicio que ya tienes implementado
    queryFn: () => petService.getById(id),
    
    enabled: !!id,
    
    // Configuración opcional según tus necesidades de frescura de datos
    staleTime: 1000 * 60 * 5,
    throwOnError: (error: any) => {
      if (
        error?.response?.status === 401 ||
        error?.status === 401
      ) {
        router.push("/login");
        return false;
      }

      return true;
    }
  });

  return query;
}