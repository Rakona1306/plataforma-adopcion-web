import { BreedCreateDto } from "@/core/application/features/shelter/breeds/dtos/breed-create-dto.";
import { BreedFilterDto } from "@/core/application/features/shelter/breeds/dtos/breed-filter-dto";
import { BreedUpdateDto } from "@/core/application/features/shelter/breeds/dtos/breed-update-dto";
import { Breed } from "@/core/domain/models/shelter/breed";
import { Paginate } from "@/core/domain/models/system/paginate";
import { IBreedRepository } from "@/core/domain/repository/shelter/breedRepository";

export class BreedService {
  constructor(
    private breedRepository: IBreedRepository
  ) {}

  async getAll(filter: BreedFilterDto): Promise<Paginate<Breed>> {
    return await this.breedRepository.getAll(filter);
  }

  async create(dto: BreedCreateDto): Promise<void> {
    return await this.breedRepository.create(dto);
  }

  async update(id: string, dto: BreedUpdateDto): Promise<void> {
    return await this.breedRepository.update(dto, id);
  }

  async delete(id: string): Promise<void> {
    return await this.breedRepository.delete(id);
  }
}