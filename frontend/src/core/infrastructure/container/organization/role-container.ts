import { httpClient } from "@/lib/httpClient";
import { RoleRepository } from "../../repositoryImpl/organization/roleRepository";

export const roleRepositoryImpl = new RoleRepository(httpClient);