import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { CreatePubReqAdoption } from "../dto/web/create-request-adoption.dto";

interface IPubRequestAdoptionService {
    create(dto: CreatePubReqAdoption): Promise<void>;
}

class PubRequestAdoptionService implements IPubRequestAdoptionService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    create(dto: CreatePubReqAdoption): Promise<void> {
        return this.httpClient.post<void>(API_ENDPOINTS.REQUEST_ADOPTION.PUBLIC_CREATE, dto);
    }
}

export const pubRequestAdoptionService = new PubRequestAdoptionService(httpClient)