import { RolePermission } from "./role-permission"

export interface Role {
  id: string
  name: string
  description?: string | null
  toDashboard: boolean

  rolePermissions: RolePermission[]
}