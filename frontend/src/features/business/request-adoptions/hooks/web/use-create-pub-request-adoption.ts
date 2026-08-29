import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreatePubReqAdoption } from "../../dto/web/create-request-adoption.dto";
import { pubRequestAdoptionService } from "../../services/pub-request-adoption.service";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function useCreatePubRequestAdoption(props?: UseMutationOptions<void, unknown, CreatePubReqAdoption>) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorValidation, setErrorValidation] = useState<Record<string, string>>({});
    const router = useRouter();

    const { mutate: createAdoption, isPending, isError } = useMutation({
        ...props,
        mutationFn: (dto: CreatePubReqAdoption) => pubRequestAdoptionService.create(dto),
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
    })

    return {
        createAdoption,
        errorMessage,
        errorValidation,
        isPending,
        isError
    }
}