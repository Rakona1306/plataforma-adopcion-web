"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { VaccineUpdateDto } from "../dtos/vaccine-update-dto";
import { vaccineContainer } from "@/core/infrastructure/container/shelter/vaccine-container";

export function useUpdateVaccine() {
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
      dto: VaccineUpdateDto;
    }) => vaccineContainer.updateVaccine(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccines"],
      });

      handleCloseModal?.();

      Swal.fire({
        title: "¡Vacuna actualizada!",
        text: "La vacuna ha sido actualizada con éxito.",
        icon: "success",
        timer: 1500,
      });
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
          error.message || "No se pudo actualizar la vacuna"
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