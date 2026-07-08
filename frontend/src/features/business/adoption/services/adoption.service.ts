import HttpClient from "@/core/infrastructure/http/client";
import { CreateReqAdoptionDetail } from "../dto/create-adoption.dto";
import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { FilterRequestAdoptionDto } from "../dto/filter-request-adoption.dto";
import { Paginate } from "@/core/domain/models/system/paginate";
import { RequestAdoptionResponse } from "../dto/request-adoption-response";
import { ReviewAdoptionDto } from "../dto/review-adoption.dto";

export interface IAdoptionService {
    requestAdoption: (createReq: CreateReqAdoptionDetail) => Promise<void>;
    paginateRequests: (filter: FilterRequestAdoptionDto) => Promise<Paginate<RequestAdoptionResponse>>;
    reviewAdoptionRequest: (requestId: string, dto: ReviewAdoptionDto) => Promise<void>;
}

class AdoptionService implements IAdoptionService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    async requestAdoption(createReq: CreateReqAdoptionDetail): Promise<void> {
        return this.httpClient.post<void>(API_ENDPOINTS.ADOPTION.CREATE, createReq);
    }

    async paginateRequests(filter: FilterRequestAdoptionDto): Promise<Paginate<RequestAdoptionResponse>> {
        return this.httpClient.get<Paginate<RequestAdoptionResponse>>(API_ENDPOINTS.ADOPTION.PAGINATE, filter);
    }

    async reviewAdoptionRequest(requestId: string, dto: ReviewAdoptionDto): Promise<void> {
        return this.httpClient.post<void>(API_ENDPOINTS.ADOPTION.REVIEW(requestId), dto);
    }
}

export const adoptionService = new AdoptionService(httpClient);