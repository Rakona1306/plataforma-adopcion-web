/* eslint-disable @typescript-eslint/no-explicit-any */
// src/presentation/hooks/organization/useCreateRole.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleCreateDto } from "@/core/application/features/organization/roles/dtos/role-create-dto";
import { roleContainer } from "@/core/infrastructure/container/organization/role-container";
import { useModal } from "@/core/application/hooks/ui/useModal";
import Swal from "sweetalert2";
import { useState } from "react";

export function useCreateRole() {
  const queryClient = useQueryClient();
  const { handleCloseModal } = useModal() || {};
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorValidation, setErrorValidation] = useState<
    Record<string, string>
  >({});

  const mutation = useMutation({
    mutationFn: (dto: RoleCreateDto) => roleContainer.createRole(dto),
    onSuccess: () => {
      // Invalidamos el caché de 'roles' para que el hook de "getAll"
      // vuelva a hacer el fetch y la tabla se actualice sola.
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      handleCloseModal?.();
      Swal.fire({
        title: "¡Role creado!",
        text: "El rol ha sido creado con éxito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: true,
      });
    },
    onError: (error: any) => {
      // LOG CRÍTICO: Mira qué trae 'error' completo en la consola
      console.log("Error completo recibido:", error);

      // A veces el objeto response de Axios/Fetch está estructurado diferente
      const data = error.response?.data || error.data;

      if (data?.errors) {
        const normalizedErrors: Record<string, string> = {};
        Object.keys(data.errors).forEach((key) => {
          normalizedErrors[key.toLowerCase()] = data.errors[key][0];
        });

        console.log("Errores normalizados:", normalizedErrors); // Debería salir { name: "..." }
        setErrorValidation(normalizedErrors);
        setErrorMessage(data.title || "Fallo la validación");
      } else {
        console.error(
          "No se encontraron errores en la estructura esperada:",
          data,
        );
        setErrorMessage(error.message || "Error desconocido");
      }
    },
  });

  return {
    create: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage,
    errorValidation,
  };
}
