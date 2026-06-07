import { SpecieCreateDto } from "@/core/application/features/shelter/species/dtos/specie-create-dto";
import { SpecieFilterDto } from "@/core/application/features/shelter/species/dtos/specie-filter-dto";
import { SpecieUpdateDto } from "@/core/application/features/shelter/species/dtos/specie-update-dto";
import { Specie } from "@/core/domain/models/shelter/specie";
import { Paginate } from "@/core/domain/models/system/paginate";
import { ISpecieRepository } from "@/core/domain/repository/shelter/specieRepository";

export class SpecieService {
  constructor(
    private specieRepository: ISpecieRepository,
  ) {}

  async getAllSpecies(filter: SpecieFilterDto): Promise<Paginate<Specie>> {
    return await this.specieRepository.getAll(filter);
  }
  async createSpecies(dto: SpecieCreateDto): Promise<void> {
    return await this.specieRepository.create(dto);
  }

  async updateSpecies(id: string, dto: SpecieUpdateDto): Promise<void> {
    return await this.specieRepository.update(id, dto);
  }

  async deleteSpecies(id: string): Promise<void> {
    return await this.specieRepository.delete(id);
  }
}