/**
 * useAuth Hook - Capa de Aplicación
 * Maneja la lógica de autenticación
 * Patrón: Custom Hook + State Management
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { userApi } from '@/infrastructure/api/userApi';
import { User, LoginInput, CreateUserInput } from '@/domain/models/User';
import { ApiError } from '@/shared/types';
import { removeAuthToken, setAuthToken } from '@/shared/utils/http';

interface UseAuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<UseAuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  /**
   * Cargar usuario actual
   */
  const loadCurrentUser = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const user = await userApi.getCurrentUser();
      setState((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof ApiError ? error.message : 'Failed to load user',
      }));
    }
  }, []);

  /**
   * Login
   */
  const login = useCallback(async (input: LoginInput) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { user, accessToken } = await userApi.login(input);
      setAuthToken(accessToken);
      setState((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
      return user;
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Login failed';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  /**
   * Register
   */
  const register = useCallback(async (input: CreateUserInput) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { user, accessToken } = await userApi.register(input);
      setAuthToken(accessToken);
      setState((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
      return user;
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Registration failed';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      await userApi.logout();
      removeAuthToken();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Logout anyway
      removeAuthToken();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  /**
   * Cargar usuario al montar el componente
   */
  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  return {
    ...state,
    login,
    register,
    logout,
    loadCurrentUser,
  };
}
