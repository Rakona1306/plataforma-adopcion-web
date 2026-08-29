import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { requestAdoptionService } from "../../services/request-adoption.service";
import { CreateRequestAdoptionDto } from "../../dto/dashboard/create-request-adoption";
import Swal from "sweetalert2";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useCreateRequestAdoption(props?: UseMutationOptions<void, unknown, CreateRequestAdoptionDto>) {

    const router = useRouter();
    const { handleCloseModal } = useModal() || {};
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorValidation, setErrorValidation] = useState<Record<string, string>>({});

    const { mutate: createAdoption, isPending, isError } = useMutation({
        ...props,
        mutationFn: (dto: CreateRequestAdoptionDto) => requestAdoptionService.create(dto),
        onError: (error: any) => {
            const status = error.response?.status || error.status;
            if (status === 401) {
                handleCloseModal && handleCloseModal();
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
    })

    return {
        createAdoption,
        isPending,
        isError,
        errorMessage,
        errorValidation
    }
}