"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { breedContainer } from "@/core/infrastructure/container/shelter/breed-container";
import { BreedUpdateDto } from "../dtos/breed-update-dto";

export function useUpdateBreed() {
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
      dto: BreedUpdateDto;
    }) => breedContainer.update(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["breeds"],
      });

      handleCloseModal?.();

      Swal.fire({
        title: "¡Raza actualizada!",
        text: "La raza ha sido actualizada con éxito.",
        icon: "success",
        timer: 1500,
      });
    },

    onError: (error: any) => {
      const status = error.response?.status || error.status;

      if (status === 401) {
        handleCloseModal?.();
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
          error.message || "No se pudo actualizar la raza"
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