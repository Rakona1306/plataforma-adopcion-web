import { Paginate } from "@/core/domain/models/system/paginate";
import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { PetVaccine } from "../model/pet-vaccine.model";
import { PetVaccineCreateDto } from "../dto/pet-vaccine-create.dto";
import { PetVaccineFilterDto } from "../dto/pet-vaccine-filter.dto";
import { PetVaccineUpdateDto } from "../dto/pet-vaccine-update.dto";

interface IPetVaccineService {
    getAll(filter: PetVaccineFilterDto): Promise<Paginate<PetVaccine>>
    create(dto: PetVaccineCreateDto): Promise<void>
    update(dto: PetVaccineUpdateDto, id: string): Promise<void>
    delete(id: string): Promise<void>
}

class PetVaccineService implements IPetVaccineService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getAll(filter: PetVaccineFilterDto): Promise<Paginate<PetVaccine>> {
        const params = new URLSearchParams();

        params.append("page", filter.page.toString());
        params.append("pageSize", filter.pageSize.toString());
        if (filter.petId) {
            params.append("petId", filter.petId)
        }

        return this.httpClient.get(`/pet-vaccines?${params.toString()}`)
    }

    create(dto: PetVaccineCreateDto): Promise<void> {
        return this.httpClient.post('/pet-vaccines', dto);
    }

    delete(id: string): Promise<void> {
        return this.httpClient.delete(`/pet-vaccines/${id}`);
    }

    update(dto: PetVaccineUpdateDto, id: string): Promise<void> {
        return this.httpClient.put(`/pet-vaccines/${id}`, dto)
    }
}

export const petVaccineService = new PetVaccineService(httpClient)