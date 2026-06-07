import { BreedFilterDto } from "@/core/application/features/shelter/breeds/dtos/breed-filter-dto";
import { Breed } from "../../models/shelter/breed";
import { Paginate } from "../../models/system/paginate";
import { BreedCreateDto } from "@/core/application/features/shelter/breeds/dtos/breed-create-dto.";
import { BreedUpdateDto } from "@/core/application/features/shelter/breeds/dtos/breed-update-dto";

export interface IBreedRepository {
  getAll(filter: BreedFilterDto): Promise<Paginate<Breed>>;
  create(dto: BreedCreateDto): Promise<void>;
  update(dto: BreedUpdateDto, id: string): Promise<void>;
  delete(id: string): Promise<void>;
}