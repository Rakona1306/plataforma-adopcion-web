import { IRoleRepository } from "@/core/domain/repository/organization/IRoleRepository";

export class GetRolesUseCase {

  constructor(
    private repository: IRoleRepository
  ) {}

  async execute() {

    return this.repository.getAll();
  }
}