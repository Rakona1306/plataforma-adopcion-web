import { Permission } from "./permission"

export interface Role {
  id: string
  name: string
  description?: string | null
  toDashboard: boolean
  notDelete: boolean
  createdAt: Date
  permissions: Permission[]
}