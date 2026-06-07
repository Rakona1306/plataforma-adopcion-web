import { Role } from "./role";

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  dni?: string;
  ruc?: string;
  phone?: string;
  district?: string;
  roleId: string;
  isBlocked: boolean;

  role?: Role;
}