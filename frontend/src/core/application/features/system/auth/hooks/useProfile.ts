"use client"

import { AuthService } from "@/core/application/services/system/auth/authService"
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import { QUERYKEYS } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";

const authService =
  new AuthService();

export const useProfile = () => {

  const {
    setUser,
  } = useSessionStore();

  const query = useQuery({
    queryKey: [QUERYKEYS.SYSTEM.AUTH],

    queryFn: () =>
      authService.profile(),

    retry: false,

    refetchOnWindowFocus: false,
  });

  useEffect(() => {

    if (query.data) {
      setUser(query.data);
    }

  }, [
    query.data,
    setUser,
  ]);

  return query;
};