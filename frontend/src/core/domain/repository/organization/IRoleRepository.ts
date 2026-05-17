
import { Role } from "../../models/organization/role";
import { Paginate } from "../../models/system/paginate";

export interface IRoleRepository {
  getAll(): Promise<Paginate<Role>>
}