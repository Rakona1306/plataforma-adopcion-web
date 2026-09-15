import { UserFilterDto } from "@/core/application/features/organization/user/dtos/user-filter-dto";
import HttpClient from "../../http/client";
import { Paginate } from "@/core/domain/models/system/paginate";
import { UserCreateDto } from "@/core/application/features/organization/user/dtos/user-create-dto";
import { ChangePasswordDto } from "@/core/application/features/organization/user/dtos/change-password-dto";
import { User } from "@/core/domain/models/organization/user";

export class UserRepository {
  constructor(private httpClient: HttpClient) {}

  async getAll(filter: UserFilterDto): Promise<Paginate<User>> {
    return await this.httpClient.get<Paginate<User>>(`/users`, filter);
  }

  async create(create: UserCreateDto): Promise<void> {
    return await this.httpClient.post<void>(`/users`, create);
  }

  async delete(id: string): Promise<void> {
    return await this.httpClient.delete<void>(`/users/${id}`);
  }

  async update(id: string, update: UserCreateDto): Promise<void> {
    return await this.httpClient.put<void>(`/users/${id}`, update);
  }

  async changePassword(dto: ChangePasswordDto): Promise<void> {
    return await this.httpClient.post<void>(`/users/change-password`, dto);
  }
}
