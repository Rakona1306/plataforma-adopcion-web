import { TraitFilterDto } from "@/core/application/features/shelter/traits/dto/trait-filter-dto";
import { Paginate } from "../../models/system/paginate";
import { Trait } from "../../models/shelter/trait";
import { TraitCreateDto } from "@/core/application/features/shelter/traits/dto/trait-create-dto";
import { TraitUpdateDto } from "@/core/application/features/shelter/traits/dto/trait-update-dto";

export interface ITraitRepository {
  getAll(filter: TraitFilterDto): Promise<Paginate<Trait>>;
  create(data: TraitCreateDto): Promise<void>;
  update(id: string,data: TraitUpdateDto): Promise<void>;
  delete(id: string): Promise<void>;
}