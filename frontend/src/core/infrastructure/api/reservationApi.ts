/**
 * Reservation API Service - Capa de Infraestructura
 * Responsable de comunicación con API de reservaciones
 */

import { httpClient } from '../http/client';
import { API_ENDPOINTS } from '@/shared/constants';
import { PaginatedResponse } from '@/shared/types';
import {
  Reservation,
  CreateReservationInput,
  UpdateReservationInput,
  ReservationFilters,
} from '@/domain/models/Reservation';

class ReservationApi {
  /**
   * List Reservations
   */
  async listReservations(
    filters: ReservationFilters & { page?: number; pageSize?: number }
  ): Promise<PaginatedResponse<Reservation>> {
    const { page = 1, pageSize = 20, ...filterParams } = filters;
    return httpClient.get<PaginatedResponse<Reservation>>(
      API_ENDPOINTS.RESERVATIONS.LIST,
      { page, pageSize, ...filterParams }
    );
  }

  /**
   * Get Reservation by ID
   */
  async getReservation(id: string): Promise<Reservation> {
    return httpClient.get<Reservation>(API_ENDPOINTS.RESERVATIONS.GET(id));
  }

  /**
   * Create Reservation
   */
  async createReservation(input: CreateReservationInput): Promise<Reservation> {
    return httpClient.post<Reservation>(
      API_ENDPOINTS.RESERVATIONS.CREATE,
      input
    );
  }

  /**
   * Update Reservation
   */
  async updateReservation(
    id: string,
    input: UpdateReservationInput
  ): Promise<Reservation> {
    return httpClient.put<Reservation>(
      API_ENDPOINTS.RESERVATIONS.UPDATE(id),
      input
    );
  }

  /**
   * Delete Reservation
   */
  async deleteReservation(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.RESERVATIONS.DELETE(id));
  }

  /**
   * Cancel Reservation
   */
  async cancelReservation(id: string): Promise<Reservation> {
    return httpClient.patch<Reservation>(
      API_ENDPOINTS.RESERVATIONS.UPDATE(id),
      { status: 'CANCELLED' }
    );
  }
}

export const reservationApi = new ReservationApi();
export default ReservationApi;
