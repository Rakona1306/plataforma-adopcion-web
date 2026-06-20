"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { useModal } from "@/core/application/hooks/ui/useModal";
import { SyncPetPhotosDto } from "../dto/create-pet-photo.dto";
import { petPhotosService } from "../services/pet-photos.service";

export function useCreatePetPhotos() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleCloseModal } = useModal() || {};

  const [errorMessage, setErrorMessage] = useState("");
  const [errorValidation, setErrorValidation] = useState<
    Record<string, string>
  >({});

  const mutation = useMutation({
    mutationFn: ({
      petId,
      dto,
    }: {
      petId: string;
      dto: SyncPetPhotosDto;
    }) => petPhotosService.create(petId, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["pet-photos"],
      });

      handleCloseModal?.();

      Swal.fire({
        title: "¡Fotos actualizadas!",
        text: "Las fotos de la mascota fueron sincronizadas correctamente.",
        icon: "success",
        timer: 1500,
      });
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
          normalized[key.toLowerCase()] =
            data.errors[key][0];
        });

        setErrorValidation(normalized);
        setErrorMessage(
          data.title || "Falló la validación"
        );
      } else {
        setErrorMessage(
          error.message ||
            "Error al sincronizar las fotos"
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