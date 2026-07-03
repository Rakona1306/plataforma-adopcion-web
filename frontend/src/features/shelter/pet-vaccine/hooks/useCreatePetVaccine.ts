import { useModal } from "@/core/application/hooks/ui/useModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { PetVaccineCreateDto } from "../dto/pet-vaccine-create.dto";
import { petVaccineService } from "../services/pet-vaccine.service";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export default function useCreatePetVaccine() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState("");
    const [errorValidation, setErrorValidation] = useState<
        Record<string, string>
    >({});

    const mutation = useMutation({
        mutationFn: (dto: PetVaccineCreateDto) =>
            petVaccineService.create(dto),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SHELTER.PET_VACCINE],
            });

            Swal.fire({
                title: "¡Vacunas registradas en la mascota!",
                text: "La accion ha sido registrada con éxito.",
                icon: "success",
                timer: 1500,
                showConfirmButton: true,
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