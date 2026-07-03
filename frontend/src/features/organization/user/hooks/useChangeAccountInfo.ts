"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeAccountInfoDto } from "../dto/changeAccountInfo.dto";
import { HttpError } from "@/core/shared/errors/http-error";
import { useLogout } from "@/features/system/auth/hooks/useLogout"; // Tu hook de logout anterior
import Swal from "sweetalert2";
import { userService } from "../services/user.service";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useModal } from "@/core/application/hooks/ui/useModal";

// Definimos la interfaz para el parámetro único de la mutación
interface ChangeAccountInfoVariables {
    dto: ChangeAccountInfoDto;
    id: string;
}

export default function useChangeAccountInfo() {
    const queryClient = useQueryClient();
    const { logout } = useLogout();
    const router = useRouter()
    const { handleCloseModal } = useModal() || {}

    const { mutate: changeAccountInfo, isPending: isLoading, error } = useMutation({

        mutationFn: ({ dto, id }: ChangeAccountInfoVariables) =>
            userService.changeAccountInfo(dto, id),

        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Perfil actualizado",
                text: "Los datos de tu cuenta se modificaron correctamente.",
                timer: 2500,
                showConfirmButton: true,
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SYSTEM.AUTH] });

            handleCloseModal?.()
        },

        onError: (err) => {
            console.error("Error en ChangeAccountInfo Mutation:", err);

            if (err instanceof HttpError && err.status === 401) {
                Swal.fire({
                    icon: "warning",
                    title: "Sesión expirada",
                    text: "Tu sesión ha terminado. Por favor, vuelve a ingresar.",
                    confirmButtonText: "Entendido",
                }).then(() => {
                    logout();
                    router.push('/login');
                });
                return;
            }
            const errorMessage = err instanceof HttpError || err instanceof Error
                ? err.message
                : "No se pudo actualizar la información de la cuenta.";

            Swal.fire({
                icon: "error",
                title: "Error al actualizar",
                text: errorMessage,
                confirmButtonColor: "#ef4444", // red-500
            });
        },
    });

    return {
        changeAccountInfo,
        isLoading,
        error,
    };
}