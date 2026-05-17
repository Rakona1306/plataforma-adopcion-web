import { AuthResponse, UserLogged } from "@/core/application/features/system/auth/dtos/authResponse.dto";
import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { RegisterDto } from "@/core/application/features/system/auth/dtos/register.dto";

export interface IAuthRepository {
  login(auth: LoginDto): Promise<AuthResponse>;
  register(register: RegisterDto): Promise<AuthResponse>;
  profile(): Promise<UserLogged>;
  logout(): Promise<void>;
}