
import { RoleFilterDto } from "@/core/application/features/organization/roles/dtos/role-filter-dto";
import { RoleCreateDto } from "@/core/application/features/organization/roles/dtos/role-create-dto";
import { Role } from "../../models/organization/role";
import { Paginate } from "../../models/system/paginate";

export interface IRoleRepository {
  getAll(filter: RoleFilterDto): Promise<Paginate<Role>>
  create(create: RoleCreateDto): Promise<void>
  delete(id: string): Promise<void>
  update(id: string, update: RoleCreateDto): Promise<void>
}