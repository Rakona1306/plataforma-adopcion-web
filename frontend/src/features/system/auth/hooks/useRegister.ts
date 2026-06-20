"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import { authService } from "../services/auth.service";
import { RegisterDto } from "@/core/application/features/system/auth/dtos/register.dto";

export const useRegister = () => {
    const router = useRouter();

    const { mutate: register, isPending: isLoading, error } = useMutation({
        mutationFn: (registerDto: RegisterDto) => authService.register(registerDto),

        // Podemos tipar el contexto o usar variables de la mutación en las respuestas
        onSuccess: (_, variables) => {
            Swal.fire({
                icon: "success",
                title: `Bienvenido ${variables.name} ${variables.lastName}`,
                timer: 3000,
                width: 400,
            });

            router.push("/");
        },
        onError: (err) => {
            console.error("Error detectado por React Query en Register:", err);
        },
    });

    return { register, isLoading, error };
};