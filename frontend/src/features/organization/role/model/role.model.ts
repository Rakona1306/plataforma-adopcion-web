import { Permission } from "../../permission/model/permission.model"


export interface Role {
    id: string
    name: string
    description?: string | null
    toDashboard: boolean
    notDelete: boolean
    createdAt: Date

    usersCount?: number

    permissions: Permission[]
}