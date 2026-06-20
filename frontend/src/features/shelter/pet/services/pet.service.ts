import HttpClient from "@/core/infrastructure/http/client";
import { Pet } from "@/core/domain/models/shelter/pet";
import { httpClient } from "@/lib/httpClient";
import { PetCreateDto } from "@/core/application/features/shelter/pets/dtos/pet-create-dto";
import { Paginate } from "@/core/domain/models/system/paginate";
import { PetFilterDto } from "@/core/application/features/shelter/pets/dtos/pet-filter-dto";
import { PetUpdateDto } from "@/core/application/features/shelter/pets/dtos/pet-update-dto";

interface IPetService {
  getById(id: string): Promise<Pet>;
  createPet(pet: PetCreateDto): Promise<void>;
  getAllPets(filter: PetFilterDto): Promise<Paginate<Pet>>;
  updatePet(id: string, pet: PetUpdateDto): Promise<void>;
  deletePet(id: string): Promise<void>;
}

class PetService implements IPetService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getById(id: string): Promise<Pet> {
    return this.httpClient.get<Pet>(`/pets/${id}`);
  }

  createPet(pet: PetCreateDto): Promise<void> {
    return this.httpClient.post('/pets', pet);
  }

  getAllPets(filter: PetFilterDto): Promise<Paginate<Pet>> {
    const params = new URLSearchParams()

    params.append('page', filter.page.toString())
    params.append('pageSize', filter.pageSize.toString())

    return this.httpClient.get(`pets?${params.toString()}`);
  }

  updatePet(id: string, pet: PetUpdateDto): Promise<void> {
    return this.httpClient.put(`/pets/${id}`, pet);
  }

  deletePet(id: string): Promise<void> {
    return this.httpClient.delete(id);
  }
}

export const petService = new PetService(httpClient);