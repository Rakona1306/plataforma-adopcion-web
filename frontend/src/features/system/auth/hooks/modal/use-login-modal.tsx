import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { useTokenStore } from "@/core/application/hooks/session/useToken";
import { MutationFunctionContext, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/auth.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { AuthResponse } from "@/core/application/features/system/auth/dtos/authResponse.dto";

interface Props {
    onSuccess?: ((data: AuthResponse, variables: LoginDto, onMutateResult: unknown, context: MutationFunctionContext) => Promise<unknown> | unknown) | undefined
}

export default function useLoginModal({ onSuccess }: Props = {}) {

    const { setToken } = useTokenStore();
    const queryClient = useQueryClient()
    const { handleOpenModal } = useModal() || {}

    const mutation = useMutation({
        mutationFn: (authDto: LoginDto) => authService.login(authDto),
        onSuccess: (data, variables, onMutateResult, context) => {
            onSuccess && onSuccess(data, variables, onMutateResult, context);
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