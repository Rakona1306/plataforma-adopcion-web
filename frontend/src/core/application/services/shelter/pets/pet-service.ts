import { PetCreateDto } from "@/core/application/features/shelter/pets/dtos/pet-create-dto";
import { Pet } from "@/core/domain/models/shelter/pet";
import { Paginate } from "@/core/domain/models/system/paginate";
import { IPetRepository } from "@/core/domain/repository/shelter/PetRepository";

export class PetService {
  constructor(
    private petRepository: IPetRepository
  ) { }

  createPet(pet: PetCreateDto): Promise<void> {
    return this.petRepository.create(pet);
  }

  getAllPets(filter: any): Promise<Paginate<Pet>> {
    return this.petRepository.getAll(filter);
  }

  updatePet(id: string, pet: any): Promise<void> {
    return this.petRepository.update(id, pet);
  }

  deletePet(id: string): Promise<void> {
    return this.petRepository.delete(id);
  }
}