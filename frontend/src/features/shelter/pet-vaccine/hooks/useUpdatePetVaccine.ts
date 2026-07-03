"use client";

import { useModal } from "@/core/application/hooks/ui/useModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { petVaccineService } from "../services/pet-vaccine.service";
import { PetVaccineUpdateDto } from "../dto/pet-vaccine-update.dto";
import Swal from "sweetalert2";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export default function useUpdatePetVaccineService() {
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
            dto: PetVaccineUpdateDto;
        }) => petVaccineService.update(dto, id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SHELTER.PET_VACCINE],
            });

            handleCloseModal?.();

            Swal.fire({
                title: "¡Relacion actualizada!",
                text: "La informacion ha sido actualizada con éxito.",
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