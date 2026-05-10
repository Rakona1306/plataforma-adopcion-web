/**
 * Room API Service - Capa de Infraestructura
 * Responsable de comunicación con API de habitaciones
 */

import { httpClient } from '../http/client';
import { API_ENDPOINTS } from '@/shared/constants';
import { PaginatedResponse } from '@/shared/types';
import { Room, RoomFilters, RoomAvailability } from '@/domain/models/Room';

class RoomApi {
  /**
   * List Rooms
   */
  async listRooms(
    filters: RoomFilters & { page?: number; pageSize?: number } = {}
  ): Promise<PaginatedResponse<Room>> {
    const { page = 1, pageSize = 20, ...filterParams } = filters;
    return httpClient.get<PaginatedResponse<Room>>(
      API_ENDPOINTS.ROOMS.LIST,
      { page, pageSize, ...filterParams }
    );
  }

  /**
   * Get Room by ID
   */
  async getRoom(id: string): Promise<Room> {
    return httpClient.get<Room>(API_ENDPOINTS.ROOMS.GET(id));
  }

  /**
   * Check Room Availability
   */
  async checkAvailability(
    roomId: string,
    checkInDate: string,
    checkOutDate: string
  ): Promise<RoomAvailability> {
    return httpClient.get<RoomAvailability>(
      `${API_ENDPOINTS.ROOMS.GET(roomId)}/availability`,
      { checkInDate, checkOutDate }
    );
  }

  /**
   * Get Available Rooms
   */
  async getAvailableRooms(
    checkInDate: string,
    checkOutDate: string,
    filters?: Omit<RoomFilters, 'checkInDate' | 'checkOutDate'>
  ): Promise<Room[]> {
    return httpClient.get<Room[]>(
      '/api/rooms/available',
      { checkInDate, checkOutDate, ...filters }
    );
  }
}

export const roomApi = new RoomApi();
export default RoomApi;
