import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { BreedPublic } from "../model/breed-pub.model";
import { Paginate } from "@/core/domain/models/system/paginate";
import { BreedFilterDto } from "@/core/application/features/shelter/breeds/dtos/breed-filter-dto";
import { appendFeatureFiltersToParams } from "@/utils/filter-url-parser";

interface IBreedService {
    get(filter: BreedFilterDto): Promise<Paginate<BreedPublic>>
}

class BreedService implements IBreedService {
    constructor(
        private httpClient: HttpClient
    ) { }

    async get(filter: BreedFilterDto): Promise<Paginate<BreedPublic>> {
        const params = new URLSearchParams()

        params.append('page', filter.page.toString())
        params.append('pageSize', filter.pageSize.toString())

        if (filter.search) {
            params.append('search', filter.search)
        }

        if (filter.storeFilters) {
            appendFeatureFiltersToParams(params, filter.activeFeatures ?? [], filter.storeFilters);
        }

        return await this.httpClient.get(`/v1/breeds?${params.toString()}`)
    }
}

export const breedService = new BreedService(httpClient)