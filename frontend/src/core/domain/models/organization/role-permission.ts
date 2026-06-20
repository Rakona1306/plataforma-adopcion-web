import { Permission } from "./permission";

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;

  permission: Permission;
}