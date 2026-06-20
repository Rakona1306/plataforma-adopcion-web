"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/core/application/hooks/session/useToken";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import { authService } from "../services/auth.service";

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { setToken } = useTokenStore();
    const { clearSession } = useSessionStore();

    const { mutate: logout, isPending: isLoading } = useMutation({
        mutationFn: () => authService.logout(),

        onSettled: () => {
            clearSession();
            queryClient.clear();
            router.replace("/login");
            setToken(null)
        }
    });

    return { logout, isLoading };
};