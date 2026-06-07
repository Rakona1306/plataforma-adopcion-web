import { httpClient } from "@/lib/httpClient";
import { SpecieRepository } from "../../repositoryImpl/shelter/specieRepository";
import { SpecieService } from "@/core/application/services/shelter/species/specie-service";

const specieRepositoryImpl = new SpecieRepository(httpClient);

export const specieContainer = new SpecieService(specieRepositoryImpl);
