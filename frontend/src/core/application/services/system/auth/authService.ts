import { AuthRepository } from "@/core/infrastructure/repositoryImpl/system/authRepository";
import { httpClient } from "@/lib/httpClient";
import { IAuthService } from "./authService.interface";
import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { RegisterDto } from "@/core/application/features/system/auth/dtos/register.dto";
import { AuthResponse, UserLogged } from "@/core/application/features/system/auth/dtos/authResponse.dto";

const authRepository = new AuthRepository(httpClient)

export class AuthService implements IAuthService {
  constructor() {}

  async login(auth: LoginDto): Promise<AuthResponse> {
    try {
      return await authRepository.login(auth)
    } catch (error) {
      throw error
    }
  }

  async register(register: RegisterDto): Promise<void> {
    try {
      await authRepository.register(register)
    } catch (error) {
      throw error
    }
  }

  async profile(): Promise<UserLogged> {
    try {
      return await authRepository.profile()
    } catch (error) {
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await authRepository.logout()
    } catch (error) {
      throw error
    }
  }
}