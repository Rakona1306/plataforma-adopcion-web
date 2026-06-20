"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { useModal } from "@/core/application/hooks/ui/useModal";
import { VaccineCreateDto } from "../dtos/vaccine-create-dto";
import { vaccineContainer } from "@/core/infrastructure/container/shelter/vaccine-container";

export function useCreateVaccine() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleCloseModal } = useModal() || {};

  const [errorMessage, setErrorMessage] = useState("");
  const [errorValidation, setErrorValidation] = useState<
    Record<string, string>
  >({});

  const mutation = useMutation({
    mutationFn: (dto: VaccineCreateDto) =>
      vaccineContainer.createVaccine(dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccines"],
      });

      handleCloseModal?.();

      Swal.fire({
        title: "¡Vacuna creada!",
        text: "La vacuna ha sido registrada con éxito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: true,
      });
    },

    onError: (error: any) => {
      const status = error.response?.status || error.status;

      if (status === 401) {
        handleCloseModal?.();
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
          error.message || "Error al crear la vacuna"
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