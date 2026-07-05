import { MutationFunctionContext, useMutation } from "@tanstack/react-query"
import { authService } from "../../services/auth.service"
import { AuthConfirmEmailDto } from "../../dto/auth-confirm-email.dto"
import useCompleteRegistration from "./use-complete-registration"
import { useConfirmOptStore } from "@/store/use-confirm-opt-store"
import { useModal } from "@/core/application/hooks/ui/useModal"
import { useTokenStore } from "@/core/application/hooks/session/useToken"

interface Props {
    onSuccess?: ((data: {
        token: string;
    }, variables: {
        name: string;
        lastName: string;
        email: string;
        password: string;
    }, onMutateResult: unknown, context: MutationFunctionContext) => Promise<unknown> | unknown) | undefined
}

export default function useConfirmOptUser({ onSuccess }: Props = {}) {

    const { userRegistered, setConfirmOpt } = useConfirmOptStore()
    const { handleCloseModal } = useModal() || {}
    const { setToken } = useTokenStore()

    const { completeRegistration } = useCompleteRegistration({
        onSuccess: async (data, variables, onMutateResult, context) => {
            onSuccess && onSuccess(data, variables, onMutateResult, context);
        }
    })

    const { mutate: confirmOpt, isPending: isLoading, error } = useMutation({
        mutationFn: (dto: AuthConfirmEmailDto) => authService.confirmEmail(dto),
        onSuccess: (_, variables) => {
            completeRegistration({ ...userRegistered!, code: variables.code });

        },
        onError: (err) => {
            console.error("Error detectado por React Query en ConfirmOptUser:", err);
        },
    })

    return {
        confirmOpt,
        isLoading,
        error
    }
}