/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { AuthService } from "@/core/application/services/system/auth/authService";
import { LoginDto } from "../dtos/login.dto";
import { useState } from "react";
import { HttpError } from "@/core/shared/errors/http-error";
import { RegisterDto } from "../dtos/register.dto";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/core/application/hooks/session/useToken";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";

export const useAuth = () => {
  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setToken } = useTokenStore();
  const queryClient = useQueryClient();
  const authService = new AuthService();
  const { clearSession, setUser } = useSessionStore();

  const login = async (auth: LoginDto) => {
    try {
      setIsLoading(true);
      const data = await authService.login(auth);
      setToken(data.token);
      setUser(data.user);

      Swal.fire({
        icon: "success",
        title: `Bienvenido ${data.user.name} ${data.user.lastName}`,
        timer: 3000,
        width: 600
      });

      if (data.user.toDashboard) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof HttpError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(error);
      } else {
        setError({
          message: "Ocurrió un error inesperado",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (register: RegisterDto) => {
    try {
      setIsLoading(true);
      await authService.register(register);

      Swal.fire({
        icon: "success",
        title: `Bienvenido ${register.name} ${register.lastName}`,
        timer: 3000,
        width: 400,
      });

      router.push("/");
    } catch (error) {
      if (error instanceof HttpError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(error);
      } else {
        setError({
          message: "Ocurrió un error inesperado",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();

      setToken(null);

      clearSession();

      queryClient.clear();

      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    login,
    error,
    isLoading,
    register,
    logout,
  };
};
