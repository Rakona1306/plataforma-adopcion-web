import HttpClient from "@/core/infrastructure/http/client";
import { Specie } from "../model/specie.model";
import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";

interface ISpeciePublicService {
    getAll(): Promise<Specie[]>
}

class SpeciePublicService implements ISpeciePublicService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getAll(): Promise<Specie[]> {
        return this.httpClient.get(API_ENDPOINTS.SHELTER.SPECIE.PUBLIC_GET_ALL);
    }
}

export const speciePublicService = new SpeciePublicService(httpClient);