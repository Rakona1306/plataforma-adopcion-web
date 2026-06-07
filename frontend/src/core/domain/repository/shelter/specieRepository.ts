import { SpecieCreateDto } from "@/core/application/features/shelter/species/dtos/specie-create-dto";
import { Specie } from "../../models/shelter/specie";
import { Paginate } from "../../models/system/paginate";
import { SpecieUpdateDto } from "@/core/application/features/shelter/species/dtos/specie-update-dto";
import { SpecieFilterDto } from "@/core/application/features/shelter/species/dtos/specie-filter-dto";

export interface ISpecieRepository {
  getAll(filter: SpecieFilterDto): Promise<Paginate<Specie>>;
  create(dto: SpecieCreateDto): Promise<void>;
  update(id: string, dto: SpecieUpdateDto): Promise<void>;
  delete(id: string): Promise<void>;
}