import HttpClient from "@/core/infrastructure/http/client";
import { CreateReqAdoptionDetail } from "../dto/create-adoption.dto";
import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { FilterRequestAdoptionDto } from "../dto/filter-request-adoption.dto";
import { Paginate } from "@/core/domain/models/system/paginate";
import { RequestAdoptionResponse } from "../dto/request-adoption-response";
import { UpdateAdoptionDto } from "../dto/dashboard/update-adoption";
import { AdoptionResponse } from "../dto/dashboard/adoption-response";

export interface IAdoptionService {
    update: (dto: UpdateAdoptionDto) => Promise<void>
    paginate: (filter: FilterRequestAdoptionDto) => Promise<Paginate<AdoptionResponse>>
    getById: (id: number) => Promise<AdoptionResponse>
    reviewAdoptionRequest: (requestedId: string, dto: UpdateAdoptionDto) => Promise<any>
}

class AdoptionService implements IAdoptionService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    async reviewAdoptionRequest(requestedId: string, dto: UpdateAdoptionDto): Promise<any> {

    };

    async update(dto: UpdateAdoptionDto): Promise<void> {
        return this.httpClient.put<void>(API_ENDPOINTS.ADOPTION.UPDATE, dto);
    }

    async paginate(filter: FilterRequestAdoptionDto): Promise<Paginate<AdoptionResponse>> {
        return this.httpClient.get<Paginate<AdoptionResponse>>(API_ENDPOINTS.ADOPTION.PAGINATE, filter);
    }

    async getById(id: number): Promise<AdoptionResponse> {
        return this.httpClient.get(API_ENDPOINTS.ADOPTION.BY_ID(id));
    }

}

export const adoptionService = new AdoptionService(httpClient);