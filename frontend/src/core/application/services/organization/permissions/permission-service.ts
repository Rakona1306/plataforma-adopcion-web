import { IPermissionRepository } from "@/core/domain/repository/organization/IPermissionRepository";

export class PermissionService {
  constructor(
    private permissionRepository: IPermissionRepository
  ) {}

  async getPermissions() {
    return await this.permissionRepository.getAll();
  }
}