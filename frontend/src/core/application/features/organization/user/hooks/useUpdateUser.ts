"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userContainer } from "@/core/infrastructure/container/organization/user-container";
import { useModal } from "@/core/application/hooks/ui/useModal";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { UserUpdateDto } from "../dtos/user-update-dto";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { handleCloseModal } = useModal() || {};
  const router = useRouter();
  
  // Estados para manejar los errores de validación del backend
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorValidation, setErrorValidation] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UserUpdateDto }) => 
      userContainer.updateUser(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleCloseModal?.();
      Swal.fire({ 
        title: "¡Usuario actualizado!", 
        text: "El usuario ha sido actualizado con éxito.",
        icon: "success", 
        timer: 1500 
      });
    },

    onError: (error: any) => {
      const status = error.response?.status || error.status;
      
      // 1. Manejo de sesión expirada
      if (status === 401) {
        Swal.fire({ 
          title: "Sesión expirada", 
          text: "Serás redirigido al login.",
          icon: "warning" 
        }).then(() => router.push("/login"));
        return;
      }

      // 2. Manejo de errores de validación (400, 422, etc.)
      const data = error.response?.data || error.data;
      if (data?.errors) {
        const normalized: Record<string, string> = {};
        Object.keys(data.errors).forEach((key) => {
          normalized[key.toLowerCase()] = data.errors[key][0];
        });
        setErrorValidation(normalized);
        setErrorMessage(data.title || "Error en la validación");
      } else {
        // 3. Manejo de error genérico
        setErrorMessage(error.message || "No se pudo actualizar el usuario");
        Swal.fire({ title: "Error", text: "Ocurrió un error inesperado", icon: "error" });
      }
    },
  });

  return { 
    update: mutation.mutate, 
    isPending: mutation.isPending,
    errorMessage,
    errorValidation
  };
}