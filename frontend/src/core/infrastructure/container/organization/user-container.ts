import { UserService } from "@/core/application/services/organization/users/user-service";
import { UserRepository } from "../../repositoryImpl/organization/userRepository";
import { httpClient } from "@/lib/httpClient";

const userRepositoryImpl = new UserRepository(httpClient);

export const userContainer = new UserService(userRepositoryImpl);