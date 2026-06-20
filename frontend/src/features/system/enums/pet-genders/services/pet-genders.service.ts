import HttpClient from "@/core/infrastructure/http/client";
import { IPetGendersService } from "./pg-service.interface";
import { PetGenders } from "../model/pet-genders.model";
import { httpClient } from "@/lib/httpClient";

class PetGendersService implements IPetGendersService {
  constructor(private httpClient: HttpClient) {}

  async getAll(): Promise<PetGenders[]> {
    return await this.httpClient.get("/enums/pet-genders");
  }
}

export const petGendersService = new PetGendersService(httpClient);