import { Role } from "./role";

export interface User {
  id: string;
  name: string;
  email: string;
  dni?: string;
  ruc?: string;
  phone?: string;
  district?: string;
  roleId: string;

  role?: Role;
}