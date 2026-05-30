import { UserFilterDto } from "@/core/application/features/organization/user/dtos/user-filter-dto";
import HttpClient from "../../http/client";
import { Role } from "@/core/domain/models/organization/role";
import { Paginate } from "@/core/domain/models/system/paginate";
import { UserCreateDto } from "@/core/application/features/organization/user/dtos/user-create-dto";
import { User } from "@/core/domain/models/User";

export class UserRepository {
  constructor(private httpClient: HttpClient) {}

  async getAll(filter: UserFilterDto): Promise<Paginate<User>> {
    const params = new URLSearchParams();
    if (filter.search) params.append("search", filter.search);
    if (filter.isBlocked !== undefined && filter.isBlocked !== "todos")
      params.append("isBlocked", filter.isBlocked);
    if (filter.roleId !== undefined && filter.roleId !== "todos")
      params.append("roleId", filter.roleId);
    // if (filter.toDashboard !== undefined && filter.toDashboard !== "todos") params.append("toDashboard", filter.toDashboard);
    params.append("page", filter.page.toString());
    params.append("pageSize", filter.pageSize.toString());

    return await this.httpClient.get<Paginate<User>>(
      `/users?${params.toString()}`,
    );
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
}
