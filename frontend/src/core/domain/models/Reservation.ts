/**
 * Domain Model - Reservación
 */

export interface Reservation {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export interface CreateReservationInput {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

export interface UpdateReservationInput {
  status?: ReservationStatus;
  specialRequests?: string;
}

export interface ReservationFilters {
  status?: ReservationStatus;
  userId?: string;
  roomId?: string;
  fromDate?: string;
  toDate?: string;
}
