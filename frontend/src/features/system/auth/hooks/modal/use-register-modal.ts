import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/auth.service";
import { RegisterDto } from "@/core/application/features/system/auth/dtos/register.dto";
import { useConfirmOptStore } from "@/store/use-confirm-opt-store";

export default function useRegisterModal() {

    const { setConfirmOpt, setUserRegistered } = useConfirmOptStore()

    const { mutate: register, isPending: isLoading, error } = useMutation({
        mutationFn: (registerDto: RegisterDto) => authService.register(registerDto),

        // Podemos tipar el contexto o usar variables de la mutación en las respuestas
        onSuccess: (_, variables) => {
            setUserRegistered(variables);
            setConfirmOpt(true);
        },
        onError: (err) => {
            console.error("Error detectado por React Query en Register:", err);
        },
    });

    return { register, isLoading, error };
}