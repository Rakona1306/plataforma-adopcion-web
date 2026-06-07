import { TraitFilterDto } from "@/core/application/features/shelter/traits/dto/trait-filter-dto";
import HttpClient from "../../http/client";
import { Trait } from "@/core/domain/models/shelter/trait";
import { Paginate } from "@/core/domain/models/system/paginate";
import { TraitCreateDto } from "@/core/application/features/shelter/traits/dto/trait-create-dto";
import { TraitUpdateDto } from "@/core/application/features/shelter/traits/dto/trait-update-dto";

export class TraitRepositoryImpl {

  constructor(
    private httpClient: HttpClient
  ) {}

  getAll(filter: TraitFilterDto): Promise<Paginate<Trait>> {
    const params = new URLSearchParams();

    params.append("page", String(filter.page));
    params.append("pageSize", String(filter.pageSize));
    if (filter.search) params.append("search", filter.search);

    return this.httpClient.get<Paginate<Trait>>(`/traits?${params.toString()}`);
  }

  create(data: TraitCreateDto): Promise<void> {
    return this.httpClient.post("/traits", data);
  }

  update(id: string, data: TraitUpdateDto): Promise<void> {
    return this.httpClient.put(`/traits/${id}`, data);
  }

  delete(id: string): Promise<void> {
    return this.httpClient.delete(`/traits/${id}`);
  }
}