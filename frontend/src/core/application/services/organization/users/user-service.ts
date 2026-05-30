import { UserCreateDto } from "@/core/application/features/organization/user/dtos/user-create-dto";
import { UserFilterDto } from "@/core/application/features/organization/user/dtos/user-filter-dto";
import { UserUpdateDto } from "@/core/application/features/organization/user/dtos/user-update-dto";
import { Paginate } from "@/core/domain/models/system/paginate";
import { User } from "@/core/domain/models/User";
import { IUserRepository } from "@/core/domain/repository/organization/IUserRepository";

export class UserService {
  constructor(
    private userRepository: IUserRepository,
  ) {}

  async getUsers(filter: UserFilterDto): Promise<Paginate<User>> {
    return this.userRepository.getAll(filter);
  }

  async createUser(create: UserCreateDto) {
    return await this.userRepository.create(create);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }

  async updateUser(id: string, update: UserUpdateDto) {
    return await this.userRepository.update(id, update);
  }
}