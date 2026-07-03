import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { useTokenStore } from "@/core/application/hooks/session/useToken";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/auth.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useModal } from "@/core/application/hooks/ui/useModal";

export default function useLoginModal() {

    const { setToken } = useTokenStore();
    const { setUser } = useSessionStore();
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (authDto: LoginDto) => authService.login(authDto),
        onSuccess: (data) => {
            console.log('SUCCESS LOGIN')

            setToken(data.token);
            setUser(data.user);

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SYSTEM.AUTH]
            })
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
}