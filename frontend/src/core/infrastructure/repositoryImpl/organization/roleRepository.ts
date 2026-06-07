
import { Role } from "@/core/domain/models/organization/role";
import { IRoleRepository } from "@/core/domain/repository/organization/IRoleRepository";
import HttpClient from "../../http/client";
import { Paginate } from "@/core/domain/models/system/paginate";
import { RoleFilterDto } from "@/core/application/features/organization/roles/dtos/role-filter-dto";
import { RoleCreateDto } from "@/core/application/features/organization/roles/dtos/role-create-dto";

export class RoleRepository implements IRoleRepository {

  constructor(
    private httpClient: HttpClient
  ) {}

  async getAll(filter: RoleFilterDto): Promise<Paginate<Role>> {
  
    const params = new URLSearchParams();
    if (filter.search) params.append("search", filter.search);
    if (filter.toDashboard !== undefined && filter.toDashboard !== "todos") params.append("toDashboard", filter.toDashboard);
    params.append("page", filter.page.toString());
    params.append("pageSize", filter.pageSize.toString());

    return await this.httpClient.get<Paginate<Role>>(`/roles?${params.toString()}`);
  }

  async create(create: RoleCreateDto): Promise<void> {
    return await this.httpClient.post<void>(`/roles`, create);
  }

  async delete(id: string): Promise<void> {
    return await this.httpClient.delete<void>(`/roles/${id}`);
  }

  async update(id: string, update: RoleCreateDto): Promise<void> {
    return await this.httpClient.put<void>(`/roles/${id}`, update);
  }
}