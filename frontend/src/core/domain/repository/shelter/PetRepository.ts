import { PetCreateDto } from "@/core/application/features/shelter/pets/dtos/pet-create-dto";
import { PetFilterDto } from "@/core/application/features/shelter/pets/dtos/pet-filter-dto";
import { Paginate } from "../../models/system/paginate";
import { Pet } from "../../models/shelter/pet";
import { PetUpdateDto } from "@/core/application/features/shelter/pets/dtos/pet-update-dto";

export interface IPetRepository {
  create(pet: PetCreateDto): Promise<void>;
  getAll(filter: PetFilterDto): Promise<Paginate<Pet>>;
  update(id: string, pet: PetUpdateDto): Promise<void>;
  delete(id: string): Promise<void>;
}