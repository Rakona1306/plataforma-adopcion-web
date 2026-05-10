/**
 * useReservations Hook - Capa de Aplicación
 * Maneja la lógica de reservaciones
 * Patrón: Domain-Specific Custom Hook
 */

'use client';

import { useState, useCallback } from 'react';
import { reservationApi } from '@/infrastructure/api/reservationApi';
import { useFetch } from './useFetch';
import {
  Reservation,
  CreateReservationInput,
  ReservationFilters,
} from '@/domain/models/Reservation';
import { PaginatedResponse, ApiError } from '@/shared/types';

interface UseReservationsState {
  isCreating: boolean;
  isUpdating: boolean;
  error: string | null;
}

export function useReservations(initialFilters: ReservationFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);
  const [state, setState] = useState<UseReservationsState>({
    isCreating: false,
    isUpdating: false,
    error: null,
  });

  /**
   * Fetch reservaciones
   */
  const { data, isLoading, error, refetch } = useFetch<PaginatedResponse<Reservation>>(
    () =>
      reservationApi.listReservations({
        ...filters,
        page: 1,
        pageSize: 20,
      }),
    {
      immediate: true,
      onError: (error) => {
        const msg = error instanceof ApiError ? error.message : error.message;
        setState((prev) => ({ ...prev, error: msg }));
      },
    }
  );

  /**
   * Crear reservación
   */
  const createReservation = useCallback(async (input: CreateReservationInput) => {
    try {
      setState((prev) => ({ ...prev, isCreating: true, error: null }));
      const reservation = await reservationApi.createReservation(input);
      setState((prev) => ({ ...prev, isCreating: false }));
      refetch();
      return reservation;
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to create reservation';
      setState((prev) => ({
        ...prev,
        isCreating: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, [refetch]);

  /**
   * Cancelar reservación
   */
  const cancelReservation = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isUpdating: true, error: null }));
      const reservation = await reservationApi.cancelReservation(id);
      setState((prev) => ({ ...prev, isUpdating: false }));
      refetch();
      return reservation;
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to cancel reservation';
      setState((prev) => ({
        ...prev,
        isUpdating: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, [refetch]);

  /**
   * Actualizar filtros
   */
  const updateFilters = useCallback((newFilters: Partial<ReservationFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return {
    reservations: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    error: error || state.error,
    isCreating: state.isCreating,
    isUpdating: state.isUpdating,
    createReservation,
    cancelReservation,
    refetch,
    updateFilters,
    filters,
  };
}
