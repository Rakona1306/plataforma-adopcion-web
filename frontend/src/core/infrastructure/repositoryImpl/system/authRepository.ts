import { IAuthRepository } from "@/core/domain/repository/system/authRepository";
import HttpClient from "../../http/client";
import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { RegisterDto } from "@/core/application/features/system/auth/dtos/register.dto";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { AuthResponse, UserLogged } from "@/core/application/features/system/auth/dtos/authResponse.dto";

export class AuthRepository implements IAuthRepository {
  constructor(
    private httpClient: HttpClient
  ) { }

  async login(auth: LoginDto): Promise<AuthResponse> {
    return await this.httpClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, auth);
  }

  async register(register: RegisterDto): Promise<AuthResponse> {
    return await this.httpClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, register);
  }

  async profile(): Promise<UserLogged> {
    return await this.httpClient.get<UserLogged>(API_ENDPOINTS.AUTH.PROFILE);
  }

  async logout(): Promise<void> {
    await this.httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }
}