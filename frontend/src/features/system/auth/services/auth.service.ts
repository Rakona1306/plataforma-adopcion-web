"use client"

import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { RegisterDto } from "@/core/application/features/system/auth/dtos/register.dto";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { AuthResponse, UserLogged } from "@/core/application/features/system/auth/dtos/authResponse.dto";
import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { AuthRegisterResponse } from "@/core/application/features/system/auth/dtos/auth-register-response";
import { AuthConfirmEmailDto } from "../dto/auth-confirm-email.dto";
import { AuthCompleteVerificationDto } from "../dto/auth-complete-verification.dto";

interface IAuthService {
    login(auth: LoginDto): Promise<AuthResponse>
    register(register: RegisterDto): Promise<AuthRegisterResponse>
    profile(): Promise<UserLogged>
    logout(): Promise<void>
    confirmEmail(dto: AuthConfirmEmailDto): Promise<void>
    completeRegistration(dto: AuthCompleteVerificationDto): Promise<{ token: string }>
}

class AuthService implements IAuthService {
    constructor(
        private httpClient: HttpClient
    ) { }

    async login(auth: LoginDto): Promise<AuthResponse> {
        return await this.httpClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, auth);
    }

    async register(register: RegisterDto): Promise<AuthRegisterResponse> {
        return await this.httpClient.post<AuthRegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, register);
    }

    async profile(): Promise<UserLogged> {
        return await this.httpClient.get<UserLogged>(API_ENDPOINTS.AUTH.PROFILE);
    }

    async logout(): Promise<void> {
        await this.httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    }

    async confirmEmail(dto: AuthConfirmEmailDto): Promise<void> {
        return this.httpClient.post(API_ENDPOINTS.AUTH.CONFIRM_EMAIL, dto);
    }

    async completeRegistration(dto: AuthCompleteVerificationDto): Promise<{ token: string }> {
        return this.httpClient.post<{ token: string }>(API_ENDPOINTS.AUTH.CREATE_USER, dto);
    }
}

export const authService = new AuthService(httpClient);