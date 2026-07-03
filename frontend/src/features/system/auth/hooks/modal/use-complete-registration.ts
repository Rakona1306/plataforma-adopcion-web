import { MutationFunctionContext, useMutation } from "@tanstack/react-query";
import { authService } from "../../services/auth.service";
import { RegisterDto } from "@/core/application/features/system/auth/dtos/register.dto";
import { AuthCompleteVerificationDto } from "../../dto/auth-complete-verification.dto";
import { useProfile } from "../useProfile";


interface Props {
    onSuccess?: ((data: { token: string }, variables: {
        name: string;
        lastName: string;
        email: string;
        password: string;
    }, onMutateResult: unknown, context: MutationFunctionContext) => Promise<unknown> | unknown) | undefined
}

export default function useCompleteRegistration({ onSuccess }: Props) {

    const { refetchProfile } = useProfile()

    const { mutate: completeRegistration, isPending: isLoading, error } = useMutation({
        mutationFn: (dto: AuthCompleteVerificationDto) => authService.completeRegistration(dto),
        onSuccess: (data, variables, onMutateResult, context) => {
            if (onSuccess) {
                onSuccess(data, variables, onMutateResult, context);
            }

            refetchProfile();
        },
        onError: (err) => {
            console.error("Error detectado por React Query en CompleteRegistration:", err);
        },
    })

    return {
        completeRegistration,
        isLoading,
        error
    }
}