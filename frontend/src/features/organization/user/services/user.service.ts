import HttpClient from "@/core/infrastructure/http/client";
import { ChangeAccountInfoDto } from "../dto/changeAccountInfo.dto";
import { httpClient } from "@/lib/httpClient";

interface IUserService {
    changeAccountInfo(dto: ChangeAccountInfoDto, id: string): Promise<void>
}

class UserService implements IUserService {
    constructor(
        private httpClient: HttpClient
    ) { }

    changeAccountInfo(dto: ChangeAccountInfoDto, id: string): Promise<void> {
        return this.httpClient.put(`/users/account/${id}`, dto)
    }
}

export const userService = new UserService(httpClient);