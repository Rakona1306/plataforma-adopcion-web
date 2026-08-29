import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { CreateReqAdoption } from "../dto/web/create-request-adoption.dto";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { RequestAdoptionFilter } from "../dto/dashboard/request-adoption-filter";
import { Paginate } from "@/core/domain/models/system/paginate";
import { RequestAdoptionResponse } from "../dto/dashboard/request-adoption";

export interface IRequestAdoptionService {
    create(createReq: CreateReqAdoption): Promise<void>
    paginate(filter: RequestAdoptionFilter): Promise<Paginate<RequestAdoptionResponse>>
}

class RequestAdoptionService {
    constructor(
        private readonly httpClient: HttpClient
    ) { }

    async create(createReq: CreateReqAdoption): Promise<void> {
        return this.httpClient.post<void>(API_ENDPOINTS.REQUEST_ADOPTION.PUBLIC_CREATE, createReq);
    }


    async paginate(filter: RequestAdoptionFilter): Promise<Paginate<RequestAdoptionResponse>> {
        return this.httpClient.get(API_ENDPOINTS.REQUEST_ADOPTION.PAGINATE, filter);
    }
}

export const requestAdoptionService = new RequestAdoptionService(httpClient);