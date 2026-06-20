"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { petContainer } from "@/core/infrastructure/container/shelter/pet-container";
import { PetUpdateDto } from "../dtos/pet-update-dto";

export function useUpdatePet() {
  const queryClient = useQueryClient();
  const { handleCloseModal } = useModal() || {};
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorValidation, setErrorValidation] = useState<
    Record<string, string>
  >({});

  const mutation = useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;
      dto: PetUpdateDto;
    }) => petContainer.updatePet(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });

      handleCloseModal?.();

      Swal.fire({
        title: "¡Mascota actualizada!",
        text: "La mascota ha sido actualizada con éxito.",
        icon: "success",
        timer: 1500,
      });
      router.push("/dashboard/mascotas");
    },

    onError: (error: any) => {
      const status = error.response?.status || error.status;

      if (status === 401) {
        Swal.fire({
          title: "Sesión expirada",
          text: "Serás redirigido al login.",
          icon: "warning",
        }).then(() => router.push("/login"));

        return;
      }

      const data = error.response?.data || error.data;

      if (data?.errors) {
        const normalized: Record<string, string> = {};

        Object.keys(data.errors).forEach((key) => {
          normalized[key.toLowerCase()] = data.errors[key][0];
        });

        setErrorValidation(normalized);
        setErrorMessage(data.title || "Error en la validación");
      } else {
        setErrorMessage(
          error.message || "No se pudo actualizar la mascota"
        );

        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado",
          icon: "error",
        });
      }
    },
  });

  return {
    update: mutation.mutate,
    isPending: mutation.isPending,
    errorMessage,
    errorValidation,
  };
}