import { IBreedRepository } from "@/core/domain/repository/shelter/breedRepository";
import HttpClient from "../../http/client";
import { Breed } from "@/core/domain/models/shelter/breed";
import { Paginate } from "@/core/domain/models/system/paginate";
import { BreedFilterDto } from "@/core/application/features/shelter/breeds/dtos/breed-filter-dto";
import { BreedCreateDto } from "@/core/application/features/shelter/breeds/dtos/breed-create-dto.";
import { BreedUpdateDto } from "@/core/application/features/shelter/breeds/dtos/breed-update-dto";

export class BreedRepository {
  constructor(private httpClient: HttpClient) {}

  async getAll(filter: BreedFilterDto): Promise<Paginate<Breed>> {
    const params = new URLSearchParams();
    if (filter.search) params.append("search", filter.search);
    if (filter.speciesId) params.append("speciesId", filter.speciesId);

    params.append("page", filter.page.toString());
    params.append("pageSize", filter.pageSize.toString());
    return await this.httpClient.get(`/breeds?${params.toString()}`);
  }

  async create(dto: BreedCreateDto): Promise<void> {
    return await this.httpClient.post(`/breeds`, dto);
  }

  async update(dto: BreedUpdateDto, id: string): Promise<void> {
    return await this.httpClient.put(`/breeds/${id}`, dto);
  }

  async delete(id: string): Promise<void> {
    return await this.httpClient.delete(`/breeds/${id}`);
  }
}
