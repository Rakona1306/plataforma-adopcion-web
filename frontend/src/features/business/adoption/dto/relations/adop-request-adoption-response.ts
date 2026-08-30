import { AdopPetResponse } from "./adop-pet-response";
import { AdopUserResponse } from "./adop-user-response";

export interface AdopRequestAdoptionResponse {
  id: number;
  status: string;
  houseType: string;
  hasOtherPets: boolean;
  hasChildren: boolean;
  acceptHomeVisit: boolean;

  // Contacto
  district: string;
  phone: string;
  address: string;
  reference: string | null;

  reviewer: AdopUserResponse | null;
  user: AdopUserResponse;
  pet: AdopPetResponse;
}
