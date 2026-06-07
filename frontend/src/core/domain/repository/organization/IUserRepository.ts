import { UserFilterDto } from "@/core/application/features/organization/user/dtos/user-filter-dto";
import { Paginate } from "../../models/system/paginate";
import { User } from "../../models/organization/user";
import { UserCreateDto } from "@/core/application/features/organization/user/dtos/user-create-dto";
import { UserUpdateDto } from "@/core/application/features/organization/user/dtos/user-update-dto";
import { ChangePasswordDto } from "@/core/application/features/organization/user/dtos/change-password-dto";

export interface IUserRepository {
  getAll(filter: UserFilterDto): Promise<Paginate<User>>;
  create(create: UserCreateDto): Promise<void>;
  delete(id: string): Promise<void>;
  update(id: string, update: UserUpdateDto): Promise<void>;
  changePassword(dto: ChangePasswordDto): Promise<void>;
}
