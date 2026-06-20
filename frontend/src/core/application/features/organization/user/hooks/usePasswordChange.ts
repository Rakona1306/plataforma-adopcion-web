"use client";

import { useModal } from "@/core/application/hooks/ui/useModal";
import { userContainer } from "@/core/infrastructure/container/organization/user-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChangePasswordDto } from "../dtos/change-password-dto";
import Swal from "sweetalert2";

export default function usePasswordChange() {

  const queryClient = useQueryClient();
  const { handleCloseModal } = useModal() || {};
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorValidation, setErrorValidation] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (dto: ChangePasswordDto) =>
      userContainer.changePassword(dto),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleCloseModal?.();
      Swal.fire({ 
        title: "¡Contraseña actualizada!", 
        text: "La contraseña ha sido actualizada con éxito.",
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
        setErrorMessage(error.message || "No se pudo actualizar la contraseña");
        Swal.fire({ title: "Error", text: "Ocurrió un error inesperado", icon: "error" });
      }
    },
  });

  return {
    changePassword: mutation.mutate,
    isPending: mutation.isPending,
    errorMessage,
    errorValidation
  }
}