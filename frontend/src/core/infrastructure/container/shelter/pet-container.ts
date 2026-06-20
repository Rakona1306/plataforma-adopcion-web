import { httpClient } from "@/lib/httpClient";
import { PetRepository } from "../../repositoryImpl/shelter/petRepository";
import { PetService } from "@/core/application/services/shelter/pets/pet-service";

const petRepositoryImpl = new PetRepository(httpClient);

export const petContainer = new PetService(petRepositoryImpl);