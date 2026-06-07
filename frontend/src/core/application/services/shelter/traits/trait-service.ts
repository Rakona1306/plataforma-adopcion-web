import { TraitCreateDto } from "@/core/application/features/shelter/traits/dto/trait-create-dto";
import { TraitFilterDto } from "@/core/application/features/shelter/traits/dto/trait-filter-dto";
import { TraitUpdateDto } from "@/core/application/features/shelter/traits/dto/trait-update-dto";
import { Trait } from "@/core/domain/models/shelter/trait";
import { Paginate } from "@/core/domain/models/system/paginate";
import { ITraitRepository } from "@/core/domain/repository/shelter/traitRepository";

export class TraitService {
  constructor(
    private traitRepository: ITraitRepository
  ) {}

  async getAll(filter: TraitFilterDto): Promise<Paginate<Trait>> {
    return this.traitRepository.getAll(filter);
  }

  async create(data: TraitCreateDto): Promise<void> {
    return this.traitRepository.create(data);
  }

  async update(id: string, data: TraitUpdateDto): Promise<void> {
    return this.traitRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.traitRepository.delete(id);
  }
}