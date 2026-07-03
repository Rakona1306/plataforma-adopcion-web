import { Paginate } from "@/core/domain/models/system/paginate";
import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { PetPublic } from "../model/pet-pub.model";
import { PetPubFilterDto } from "../dto/pet-pub-filter.dto";
import { ConfirmedPetFilters } from "../store/use-filter-pet-store/interfaces/confirmed-pet-filters";
import { buildUrlParams } from "@/utils/build-url-parser";

interface GetRecommendationsParams {
    specieId: string;
    breedIds: string[];
    traitIds?: string[];
    pageSize: number;
    petId: string;
}

interface IPetPubService {
    getPaginateSearch(filters: PetPubFilterDto, confirmedFilters: ConfirmedPetFilters): Promise<Paginate<PetPublic>>
    getBySlug(slug: string): Promise<PetPublic>
    getRecommendations(params: GetRecommendationsParams): Promise<PetPublic[]>
}

class PetPubService implements IPetPubService {
    constructor(
        private readonly httpClient: HttpClient
    ) { }

    getPaginateSearch(filters: PetPubFilterDto, confirmedFilters: ConfirmedPetFilters): Promise<Paginate<PetPublic>> {
        const mergedFilters = {
            page: filters.page ?? 1,
            pageSize: filters.pageSize ?? 20,
            sort: filters.sort,
            search: filters.search,
            ...confirmedFilters
        };

        // 🚀 El parser se encarga de todo de forma automática y genérica
        const params = buildUrlParams(mergedFilters);
        const queryString = params.toString();
        const url = queryString ? `/v1/pets?${queryString}` : '/v1/pets';

        return this.httpClient.get(url);
    }

    getBySlug(slug: string): Promise<PetPublic> {
        return this.httpClient.get(`/v1/pets/${slug}`)
    }

    getRecommendations(params: GetRecommendationsParams): Promise<PetPublic[]> {
        const { specieId, breedIds, pageSize, petId, traitIds } = params;

        const recommendFilters = {
            page: 1,
            pageSize,
            specieId,
            breedIds,
            traitIds,
            notId: petId,
        };

        const urlParams = buildUrlParams(recommendFilters);
        const queryString = urlParams.toString();
        const url = queryString ? `/v1/pets/recommendations?${queryString}` : '/v1/pets/recommendations';

        return this.httpClient.get(url);
    }
}

export const petPubService = new PetPubService(httpClient);