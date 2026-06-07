import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { IPetSizeService } from "./pet-sizes-service.interface";
import { PetSizes } from "../model/pet-sizes.model";

class PetSizesService implements IPetSizeService {
  constructor(
    private httpClient: HttpClient
  ) {}

  async getAll(): Promise<PetSizes[]> {
    return this.httpClient.get("/enums/pet-sizes");
  }
}

export const petSizesService = new PetSizesService(httpClient);