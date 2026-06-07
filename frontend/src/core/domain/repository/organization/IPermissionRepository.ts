import { Permission } from "../../models/organization/permission";

export interface IPermissionRepository {
  getAll(): Promise<Permission[]>
}