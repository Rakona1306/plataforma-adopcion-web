import { MutationFunctionContext, useMutation } from "@tanstack/react-query";
import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { authService } from "../services/auth.service";
import { AuthResponse } from "@/core/application/features/system/auth/dtos/authResponse.dto";

interface Props {
    onSuccess?: ((data: AuthResponse, variables: LoginDto, onMutateResult: unknown, context: MutationFunctionContext) => Promise<unknown> | unknown) | undefined
}

export const useLogin = ({ onSuccess }: Props = {}) => {

    const mutation = useMutation({
        mutationFn: (authDto: LoginDto) => authService.login(authDto),
        onSuccess: (data, variables, onMutateResult, context) => {
            if (onSuccess) {
                onSuccess(data, variables, onMutateResult, context);
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