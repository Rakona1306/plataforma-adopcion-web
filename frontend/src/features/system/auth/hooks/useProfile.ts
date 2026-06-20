"use client";

import { useQuery } from "@tanstack/react-query";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import { authService } from "../services/auth.service";
import { QUERYKEYS } from "@/shared/constants/queryKeys";

export const useProfile = () => {
    const { setUser } = useSessionStore();

    const { data: profile, isLoading, error, isRefetching, refetch, isFetching } = useQuery({
        queryKey: [QUERYKEYS.SYSTEM.AUTH],
        queryFn: async () => {
            const data = await authService.profile();
            // 2. Sincronizamos con Zustand inmediatamente al recibir los datos con éxito
            setUser(data);
            return data;
        },
        retry: false,
        refetchOnWindowFocus: false,
        // Opcional: Si quieres que no pida el perfil constantemente si ya existe en el caché
        staleTime: 1000 * 60 * 5, // 5 minutos
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