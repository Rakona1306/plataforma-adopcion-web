import { httpClient } from "@/lib/httpClient";
import { PermissionRepository } from "../../repositoryImpl/organization/permissionRepository";
import { PermissionService } from "@/core/application/services/organization/permissions/permission-service";

const permissionRepositoryImpl = new PermissionRepository(httpClient);
export const permissionContainer = new PermissionService(permissionRepositoryImpl);