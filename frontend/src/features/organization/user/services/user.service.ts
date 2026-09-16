import HttpClient from "@/core/infrastructure/http/client";
import { ChangeAccountInfoDto } from "../dto/changeAccountInfo.dto";
import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { ValidateDniResponse } from "../dto/validate-dni-response";
import { Paginate } from "@/core/domain/models/system/paginate";
import { User } from "@/core/domain/models/organization/user";
import { UserFilterDto } from "@/core/application/features/organization/user/dtos/user-filter-dto";

interface IUserService {
  changeAccountInfo(dto: ChangeAccountInfoDto, id: string): Promise<void>;
}

class UserService implements IUserService {
  constructor(private httpClient: HttpClient) {}

  changeAccountInfo(dto: ChangeAccountInfoDto, id: string): Promise<void> {
    return this.httpClient.put(`/users/account/${id}`, dto);
  }

  validateDni(dni: string): Promise<ValidateDniResponse> {
    return this.httpClient.get(API_ENDPOINTS.USERS.VALIDATE_DNI(dni));
  }

  get(filter: UserFilterDto): Promise<Paginate<User>> {
    return this.httpClient.get(API_ENDPOINTS.USERS.LIST, filter);
  }
}

export const userService = new UserService(httpClient);
