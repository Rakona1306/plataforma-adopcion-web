import { RoleCreateDto } from "@/core/application/features/organization/roles/dtos/role-create-dto";
import { RoleFilterDto } from "@/core/application/features/organization/roles/dtos/role-filter-dto";
import { IRoleRepository } from "@/core/domain/repository/organization/IRoleRepository";

export class RoleService {
  constructor(private roleRepository: IRoleRepository) {}

  async getRoles(filter: RoleFilterDto) {
    return await this.roleRepository.getAll(filter);
  }

  async createRole(create: RoleCreateDto) {
    return await this.roleRepository.create(create);
  }

  async deleteRole(id: string) {
    return await this.roleRepository.delete(id);
  }

  async updateRole(id: string, update: RoleCreateDto) {
    return await this.roleRepository.update(id, update);
  }
}