import { httpClient } from "@/lib/httpClient";
import { RoleRepository } from "../../repositoryImpl/organization/roleRepository";
import { RoleService } from "@/core/application/services/organization/roles/roles-service";

export const roleRepositoryImpl = new RoleRepository(httpClient);

export const roleContainer = new RoleService(roleRepositoryImpl);