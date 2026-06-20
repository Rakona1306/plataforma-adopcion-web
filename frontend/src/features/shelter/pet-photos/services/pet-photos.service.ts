import HttpClient from "@/core/infrastructure/http/client";
import { PetPhotosServiceInterface } from "./pp-service.interface";
import { PetPhoto } from "../model/pet-photo.model";
import { SyncPetPhotosDto } from "../dto/create-pet-photo.dto";
import { httpClient } from "@/lib/httpClient";
import { PetPhotoFilter } from "../dto/pet-photo-filter.dto";
import { Paginate } from "@/core/domain/models/system/paginate";
import { convertBodyToFormData } from "../utils/convertBodyToFormData";
import axios from "axios"
import { API_CONFIG } from "@/core/shared/constants";

class PetPhotosService implements PetPhotosServiceInterface {
  constructor(private httpClient: HttpClient) {}

  getAll(filter: PetPhotoFilter): Promise<Paginate<PetPhoto>> {
    const searchParams = new URLSearchParams();

    if (filter.petId) {
      searchParams.append("petId", filter.petId);
    }
    if (filter.isMain) {
      searchParams.append("isMain", filter.isMain.toString());
    }
    searchParams.append("page", filter.page.toString());
    searchParams.append("pageSize", filter.pageSize.toString());

    return this.httpClient.get<Paginate<PetPhoto>>(
      `/pet-photos?${searchParams.toString()}`,
    );
  }

  async create(petId: string, dto: SyncPetPhotosDto): Promise<void> {
    const formData = convertBodyToFormData(dto);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.postForm(`${API_CONFIG.BASE_URL}/pet-photos/${petId}/sync-photos`, formData);
    return response.data;
    /*
    return this.httpClient.post(`/pet-photos/${petId}/sync-photos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    */
  }
}

export const petPhotosService = new PetPhotosService(httpClient);
