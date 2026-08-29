import { Paginate } from "@/core/domain/models/system/paginate";
import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { AdoptionFollowUpResponse } from "../../dto/dashboard/adoption-followup-response";
import { AdoptionFollowUpFilter } from "../../dto/adoption-followup-filter";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { CreateAdoptionFollowUp } from "../../dto/dashboard/create-adoption-followup";
import { UpdateAdoptionFollowUp } from "../../dto/dashboard/update-adoption-followup";

interface IAdoptionFollowUpService {
    paginate(filter: AdoptionFollowUpFilter): Promise<Paginate<AdoptionFollowUpResponse>>
    create(dto: CreateAdoptionFollowUp): Promise<void>
    update(dto: UpdateAdoptionFollowUp, id: number): Promise<void>
    delete(id: number): Promise<void>
    getById(id: number): Promise<AdoptionFollowUpResponse>
}

class AdoptionFollowUpService implements IAdoptionFollowUpService {
    constructor(
        private readonly httpClient: HttpClient
    ) { }
    create(dto: CreateAdoptionFollowUp): Promise<void> {
        return this.httpClient.post(`${API_ENDPOINTS.ADOPTION_FOLLOW_UP.CREATE}`, dto)
    }
    update(dto: UpdateAdoptionFollowUp, id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<AdoptionFollowUpResponse> {
        throw new Error("Method not implemented.");
    }

    async paginate(filter: AdoptionFollowUpFilter): Promise<Paginate<AdoptionFollowUpResponse>> {
        return this.httpClient.get<Paginate<AdoptionFollowUpResponse>>(`${API_ENDPOINTS.ADOPTION_FOLLOW_UP.PAGINATE}`, { params: filter })
    }

}

export const adoptionFollowUpService = new AdoptionFollowUpService(httpClient)