import { IPermissionRepository } from "@/core/domain/repository/organization/IPermissionRepository";
import HttpClient from "../../http/client";
import { Permission } from "@/core/domain/models/organization/permission";

export class PermissionRepository implements IPermissionRepository {

  constructor(
    private httpClient: HttpClient
  ) {}

  getAll(): Promise<Permission[]> {
    return this.httpClient.get<Permission[]>(`/permissions/all`);
  }
}