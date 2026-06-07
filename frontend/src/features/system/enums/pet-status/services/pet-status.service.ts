import HttpClient from "@/core/infrastructure/http/client";
import { IPetStatusService } from "./pet-status-service.interface";
import { httpClient } from "@/lib/httpClient";
import { PetStatus } from "../model/pet-status.model";

class PetStatusService implements IPetStatusService {
  
  constructor(private httpClient: HttpClient) {}

  async getAll(): Promise<PetStatus[]> {
    return await this.httpClient.get("/enums/pet-status");
  }
}

export const petStatusService = new PetStatusService(httpClient);
