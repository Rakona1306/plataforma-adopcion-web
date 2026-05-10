/**
 * User API Service - Capa de Infraestructura
 * Responsable de comunicación con API de usuarios
 */

import { httpClient } from '../http/client';
import { API_ENDPOINTS } from '@/shared/constants';
import { ApiResponse, PaginatedResponse } from '@/shared/types';
import { User, CreateUserInput, UpdateUserInput, LoginInput, AuthResponse } from '@/domain/models/User';

class UserApi {
  /**
   * Login
   */
  async login(input: LoginInput): Promise<AuthResponse> {
    return httpClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      input,
      { retry: false }
    );
  }

  /**
   * Register
   */
  async register(input: CreateUserInput): Promise<AuthResponse> {
    return httpClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      input,
      { retry: false }
    );
  }

  /**
   * Get Current User
   */
  async getCurrentUser(): Promise<User> {
    return httpClient.get<User>('/api/auth/me');
  }

  /**
   * List Users
   */
  async listUsers(page = 1, pageSize = 20): Promise<PaginatedResponse<User>> {
    return httpClient.get<PaginatedResponse<User>>(
      API_ENDPOINTS.USERS.LIST,
      { page, pageSize }
    );
  }

  /**
   * Get User by ID
   */
  async getUser(id: string): Promise<User> {
    return httpClient.get<User>(API_ENDPOINTS.USERS.GET(id));
  }

  /**
   * Create User
   */
  async createUser(input: CreateUserInput): Promise<User> {
    return httpClient.post<User>(
      API_ENDPOINTS.USERS.CREATE,
      input
    );
  }

  /**
   * Update User
   */
  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    return httpClient.put<User>(
      API_ENDPOINTS.USERS.UPDATE(id),
      input
    );
  }

  /**
   * Delete User
   */
  async deleteUser(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.USERS.DELETE(id));
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }
}

export const userApi = new UserApi();
export default UserApi;
