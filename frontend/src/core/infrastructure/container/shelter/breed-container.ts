import { httpClient } from "@/lib/httpClient";
import { BreedRepository } from "../../repositoryImpl/shelter/breedRepository";
import { BreedService } from "@/core/application/services/shelter/breeds/breed-service";

const breedRepositoryImpl = new BreedRepository(httpClient);

export const breedContainer = new BreedService(breedRepositoryImpl);
