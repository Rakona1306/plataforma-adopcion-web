/**
 * Domain Model - Habitación
 */

export interface Room {
  id: string;
  name: string;
  description: string;
  roomType: RoomType;
  capacity: number;
  pricePerNight: number;
  isAvailable: boolean;
  amenities: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DORMITORY = 'DORMITORY',
}

export interface CreateRoomInput {
  name: string;
  description: string;
  roomType: RoomType;
  capacity: number;
  pricePerNight: number;
  amenities: string[];
}

export interface RoomAvailability {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  isAvailable: boolean;
}

export interface RoomFilters {
  roomType?: RoomType;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  checkInDate?: string;
  checkOutDate?: string;
}
