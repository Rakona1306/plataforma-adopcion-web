import HttpClient from "@/core/infrastructure/http/client";
import { ChangeAccountInfoDto } from "../dto/changeAccountInfo.dto";
import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { ValidateDniResponse } from "../dto/validate-dni-response";

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
}

export const userService = new UserService(httpClient);
