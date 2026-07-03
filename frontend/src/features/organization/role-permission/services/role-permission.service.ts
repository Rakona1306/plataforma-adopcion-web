import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { RolePermission } from "../model/role-permission.model";

interface IRolePermissionService {
    getPermissionsByRoleId(roleId: string): Promise<RolePermission[]>
}

class RolePermissionService implements IRolePermissionService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getPermissionsByRoleId(roleId: string): Promise<RolePermission[]> {
        return this.httpClient.get(`/role-permissions/role/${roleId}`)
    }
}

export const rolePermissionService = new RolePermissionService(httpClient);