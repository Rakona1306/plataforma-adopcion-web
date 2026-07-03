import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { Role } from "../model/role.model";
import { Paginate } from "@/core/domain/models/system/paginate";
import { RoleFilterDto } from "../dtos/role-filter-dto";
import { RoleCreateDto } from "../dtos/role-create-dto";
import { RoleUpdateDto } from "../dtos/role-update-dto";

interface IRoleService {
    get(filter: RoleFilterDto): Promise<Paginate<Role>>
    create(dto: RoleCreateDto): Promise<void>
    delete(id: string): Promise<void>
    update(id: string, dto: RoleUpdateDto): Promise<void>
}

class RoleService implements IRoleService {
    constructor(
        private httpClient: HttpClient
    ) { }


    async get(filter: RoleFilterDto) {
        const params = new URLSearchParams();
        if (filter.search) params.append("search", filter.search);
        if (filter.toDashboard !== undefined && filter.toDashboard !== "todos") params.append("toDashboard", filter.toDashboard);
        params.append("page", filter.page.toString());
        params.append("pageSize", filter.pageSize.toString());

        return await this.httpClient.get<Paginate<Role>>(`/roles?${params.toString()}`);
    }

    async create(dto: RoleCreateDto) {
        return await this.httpClient.post<void>(`/roles`, dto);
    }

    async delete(id: string) {
        return await this.httpClient.delete<void>(`/roles/${id}`);
    }

    async update(id: string, dto: RoleUpdateDto) {
        return await this.httpClient.put<void>(`/roles/${id}`, dto);
    }
}

export const roleService = new RoleService(httpClient)