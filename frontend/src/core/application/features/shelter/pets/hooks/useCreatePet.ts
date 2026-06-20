"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { useModal } from "@/core/application/hooks/ui/useModal";
import { petContainer } from "@/core/infrastructure/container/shelter/pet-container";
import { PetCreateDto } from "../dtos/pet-create-dto";

export function useCreatePet() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleCloseModal } = useModal() || {};

  const [errorMessage, setErrorMessage] = useState("");
  const [errorValidation, setErrorValidation] = useState<
    Record<string, string>
  >({});

  const mutation = useMutation({
    mutationFn: (dto: PetCreateDto) =>
      petContainer.createPet(dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });

      handleCloseModal?.();

      Swal.fire({
        title: "¡Mascota registrada!",
        text: "La mascota ha sido registrada con éxito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: true,
      });

      router.push("/dashboard/mascotas");
    },

    onError: (error: any) => {
      const status = error.response?.status || error.status;

      if (status === 401) {
        Swal.fire({
          title: "Sesión expirada",
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
        setErrorMessage(data.title || "Falló la validación");
      } else {
        setErrorMessage(
          error.message || "Error al registrar la mascota"
        );
      }
    },
  });

  return {
    create: mutation.mutate,
    isPending: mutation.isPending,
    errorMessage,
    errorValidation,
  };
}