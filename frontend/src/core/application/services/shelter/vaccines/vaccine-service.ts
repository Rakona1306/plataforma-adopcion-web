import { VaccineCreateDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-create-dto";
import { VaccineFilterDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-filter-dto";
import { VaccineUpdateDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-update-dto";
import { Vaccine } from "@/core/domain/models/shelter/vaccine";
import { Paginate } from "@/core/domain/models/system/paginate";
import { IVaccineRepository } from "@/core/domain/repository/shelter/vaccineRepository";

export class VaccineService {
  constructor(
    private vaccineRepository: IVaccineRepository,
  ) {}

  async getAllVaccines(filter: VaccineFilterDto): Promise<Paginate<Vaccine>> {
    return await this.vaccineRepository.getAll(filter);
  }
  async createVaccine(dto: VaccineCreateDto): Promise<void> {
    return await this.vaccineRepository.create(dto);
  }

  async updateVaccine(id: string, dto: VaccineUpdateDto): Promise<void> {
    return await this.vaccineRepository.update(id, dto);
  }

  async deleteVaccine(id: string): Promise<void> {
    return await this.vaccineRepository.delete(id);
  }
}