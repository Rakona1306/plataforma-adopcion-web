"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userContainer } from "@/core/infrastructure/container/organization/user-container";
import { useModal } from "@/core/application/hooks/ui/useModal";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCreateDto } from "../dtos/user-create-dto";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleCloseModal } = useModal() || {};
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorValidation, setErrorValidation] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (dto: UserCreateDto) => userContainer.createUser(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleCloseModal?.();
      Swal.fire({
        title: "¡Usuario creado!",
        text: "El usuario ha sido registrado con éxito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: true,
      });
    },
    onError: (error: any) => {
      const status = error.response?.status || error.status;
      if (status === 401) {
        Swal.fire({ title: "Sesión expirada", icon: "warning" }).then(() => router.push("/login"));
        return;
      }
      
      const data = error.response?.data || error.data;
      if (data?.errors) {
        const normalized: Record<string, string> = {};
        Object.keys(data.errors).forEach((key) => normalized[key.toLowerCase()] = data.errors[key][0]);
        setErrorValidation(normalized);
        setErrorMessage(data.title || "Fallo la validación");
      } else {
        setErrorMessage(error.message || "Error al crear usuario");
      }
    },
  });

  return { create: mutation.mutate, isPending: mutation.isPending, errorMessage, errorValidation };
}