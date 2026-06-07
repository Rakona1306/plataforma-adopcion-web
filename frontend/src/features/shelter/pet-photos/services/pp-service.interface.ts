import { Paginate } from "@/core/domain/models/system/paginate";
import { SyncPetPhotosDto } from "../dto/create-pet-photo.dto";
import { PetPhotoFilter } from "../dto/pet-photo-filter.dto";
import { PetPhoto } from "../model/pet-photo.model";

export interface PetPhotosServiceInterface {
  getAll(filter: PetPhotoFilter): Promise<Paginate<PetPhoto>>;
  create(petId: string, dto: SyncPetPhotosDto): Promise<void>;
}