import HttpClient from "@/core/infrastructure/http/client";
import { IPetService } from "./pet-service.interface";
import { Pet } from "@/core/domain/models/shelter/pet";
import { httpClient } from "@/lib/httpClient";

class PetService implements IPetService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getById(id: string): Promise<Pet> {
    return this.httpClient.get<Pet>(`/pets/${id}`);
  }
}

export const petService = new PetService(httpClient);