"use client";

import { useQuery } from "@tanstack/react-query";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import { authService } from "../services/auth.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useRouter } from "next/navigation";

export const useProfile = () => {
    const { setUser } = useSessionStore();
    const router = useRouter()

    const { data: profile, isLoading, error, isRefetching, refetch, isFetching } = useQuery({
        queryKey: [QUERY_KEYS.SYSTEM.AUTH],
        queryFn: async () => {
            const data = await authService.profile();
            // 2. Sincronizamos con Zustand inmediatamente al recibir los datos con éxito
            setUser(data);
            return data;
        },
        retry: false,
        refetchOnWindowFocus: false,
        /*
        throwOnError: (error: any) => {
            
            if (
                error?.response?.status === 401 ||
                error?.status === 401
            ) {
                router.push("/login");
                return false;
            }
            
            return true;
        },
        */
    });


    // Retornamos una interfaz limpia y consistente con tus otros hooks de Auth
    return {
        profile,
        isLoading,
        error,
        isRefetching,
        isFetching,
        refetchProfile: refetch
    };
};