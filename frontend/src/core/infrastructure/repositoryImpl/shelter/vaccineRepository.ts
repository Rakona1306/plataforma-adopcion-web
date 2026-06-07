import { VaccineFilterDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-filter-dto";
import { Vaccine } from "@/core/domain/models/shelter/vaccine";
import { Paginate } from "@/core/domain/models/system/paginate";
import { IVaccineRepository } from "@/core/domain/repository/shelter/vaccineRepository";
import HttpClient from "../../http/client";
import { httpClient } from "@/lib/httpClient";
import { VaccineCreateDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-create-dto";
import { VaccineUpdateDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-update-dto";

export class VaccineRepositoryImpl implements IVaccineRepository {

  constructor(
    private httpClient: HttpClient
  ) {}

  async getAll(filter: VaccineFilterDto): Promise<Paginate<Vaccine>> {
    const params = new URLSearchParams();
    if (filter.search) params.append("search", filter.search);

    params.append("page", filter.page.toString());
    params.append("pageSize", filter.pageSize.toString());
    return httpClient.get<Paginate<Vaccine>>(`/vaccines?${params.toString()}`);
  }

  async create(dto: VaccineCreateDto): Promise<void> {
    return httpClient.post<void>(`/vaccines`, dto);
  }

  async update(id: string, dto: VaccineUpdateDto): Promise<void> {
    return httpClient.put<void>(`/vaccines/${id}`, dto);
  }

  async delete(id: string): Promise<void> {
    return httpClient.delete<void>(`/vaccines/${id}`);
  }
}