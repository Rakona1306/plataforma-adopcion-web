import { useMutation } from "@tanstack/react-query";
import { requestAdoptionService } from "../../services/request-adoption.service";
import { ReviewReqAdoptionDto } from "../../dto/dashboard/review-req-adoption";
import { useState } from "react";
import Swal from "sweetalert2";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useRouter } from "next/navigation";

export default function useReviewRequestAdoption() {
    const router = useRouter();
    const { handleCloseModal } = useModal() || {}
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorValidation, setErrorValidation] = useState<Record<string, string>>({});

    const mutation = useMutation({
        mutationFn: ({ requestId, dto }: { requestId: number, dto: ReviewReqAdoptionDto }) => requestAdoptionService.reviewAdoptionRequest(requestId, dto),
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
        }
    })

    return {
        ...mutation,
        errorMessage,
        errorValidation
    }
}