import { useMutation } from "@tanstack/react-query";

import { useTokenStore } from "@/core/application/hooks/session/useToken";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { authService } from "../services/auth.service";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const useLogin = () => {
    const { setToken } = useTokenStore();
    const { setUser } = useSessionStore();
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: (authDto: LoginDto) => authService.login(authDto),
        onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);

            Swal.fire({
                icon: "success",
                title: `Bienvenido ${data.user.name} ${data.user.lastName}`,
                timer: 3000,
                width: 600
            });

            if (data.user.toDashboard) {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
        },
        onError: (error) => {
            console.error("Error en login:", error);
        }
    });

    return {
        login: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error
    };
};