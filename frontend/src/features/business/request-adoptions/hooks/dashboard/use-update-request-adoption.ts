import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useState } from "react";
import { requestAdoptionService } from "../../services/request-adoption.service";
import { UpdateRequestAdoptionDto } from "../../dto/dashboard/update-request-adoption";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function useUpdateRequestAdoption(
  props?: UseMutationOptions<void, unknown, UpdateRequestAdoptionDto>,
) {
  const router = useRouter();
  const { handleCloseModal } = useModal() || {};
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorValidation, setErrorValidation] = useState<
    Record<string, string>
  >({});
  const mutation = useMutation({
    ...props,
    mutationFn: (dto: UpdateRequestAdoptionDto) =>
      requestAdoptionService.update(dto.id, dto),
    onError: (error: any) => {
      const status = error.response?.status || error.status;
      if (status === 401) {
        handleCloseModal && handleCloseModal();
        Swal.fire({ title: "Sesión expirada", icon: "warning" }).then(() =>
          router.push("/login"),
        );
        return;
      }

      const data = error.response?.data || error.data;
      if (data?.errors) {
        const normalized: Record<string, string> = {};
        Object.keys(data.errors).forEach(
          (key) => (normalized[key.toLowerCase()] = data.errors[key][0]),
        );
        setErrorValidation(normalized);
        setErrorMessage(data.title || "Fallo la validación");
      } else {
        setErrorMessage(error.message || "Error al crear usuario");
      }
    },
  });

  return {
    ...mutation,
    update: mutation.mutate,
    errorMessage,
    errorValidation,
  };
}
