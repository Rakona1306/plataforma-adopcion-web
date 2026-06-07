import { ISpecieRepository } from "@/core/domain/repository/shelter/specieRepository";
import HttpClient from "../../http/client";
import { Paginate } from "@/core/domain/models/system/paginate";
import { Specie } from "@/core/domain/models/shelter/specie";
import { SpecieFilterDto } from "@/core/application/features/shelter/species/dtos/specie-filter-dto";

export class SpecieRepository implements ISpecieRepository {
  constructor(
    private httpClient: HttpClient
  ) {}

  async getAll(filter: SpecieFilterDto): Promise<Paginate<Specie>> {
    const params = new URLSearchParams();
    if (filter.search) params.append("search", filter.search);

    params.append("page", filter.page.toString());
    params.append("pageSize", filter.pageSize.toString());
    return await this.httpClient.get<Paginate<Specie>>(`/species?${params.toString()}`);
  }

  async create(dto: Specie): Promise<void> {
    return await this.httpClient.post<void>(`/species`, dto);
  }

  async update(id: string, dto: Specie): Promise<void> {
    return await this.httpClient.put<void>(`/species/${id}`, dto);
  }

  async delete(id: string): Promise<void> {
    return await this.httpClient.delete<void>(`/species/${id}`);
  }
}