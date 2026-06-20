import { PetCreateDto } from "@/core/application/features/shelter/pets/dtos/pet-create-dto";
import HttpClient from "../../http/client";
import { PetFilterDto } from "@/core/application/features/shelter/pets/dtos/pet-filter-dto";
import { Pet } from "@/core/domain/models/shelter/pet";
import { Paginate } from "@/core/domain/models/system/paginate";
import { PetUpdateDto } from "@/core/application/features/shelter/pets/dtos/pet-update-dto";
import { IPetRepository } from "@/core/domain/repository/shelter/PetRepository";

export class PetRepository implements IPetRepository {

  constructor(
    private httpCLient: HttpClient
  ) { }

  create(pet: PetCreateDto): Promise<void> {
    return this.httpCLient.post("/pets", pet);
  }

  getAll(filter: PetFilterDto): Promise<Paginate<Pet>> {
    const params = new URLSearchParams();
    params.append("page", filter.page.toString());
    params.append("pageSize", filter.pageSize.toString());
    if (filter.search) {
      params.append("search", filter.search);
    }
    return this.httpCLient.get(`/pets?${params.toString()}`);
  }

  update(id: string, pet: PetUpdateDto): Promise<void> {
    return this.httpCLient.put(`/pets/${id}`, pet);
  }

  delete(id: string): Promise<void> {
    return this.httpCLient.delete(`/pets/${id}`);
  }
}