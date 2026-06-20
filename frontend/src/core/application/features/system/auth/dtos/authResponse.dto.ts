import { Role } from "@/core/domain/models/organization/role";

export interface AuthResponse {
  user: UserLogged
  token: string
}

export interface UserLogged {
  id: string;
  name: string;
  lastName: string;
  email: string;
  dni?: string | null;
  ruc?: string | null;
  phone?: string | null;
  district?: string | null;
  role?: Role | null;
  toDashboard: boolean;
}