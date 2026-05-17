
import { Role } from "@/core/domain/models/organization/role";
import { IRoleRepository } from "@/core/domain/repository/organization/IRoleRepository";
import HttpClient from "../../http/client";
import { Paginate } from "@/core/domain/models/system/paginate";

export class RoleRepository implements IRoleRepository {

  constructor(
    private httpClient: HttpClient
  ) {}

  async getAll(): Promise<Paginate<Role>> {
    
    const data = await this.httpClient.get<Paginate<Role>>(`/roles`);
  
    return data;
  }
}