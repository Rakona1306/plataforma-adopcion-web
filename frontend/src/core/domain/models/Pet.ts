import { PetCharacteristics } from "./PetCharacteristics";
import { Race } from "./Race";

export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  description: string;
  characteristics: PetCharacteristics[];
  gender: string
  isVaccinated: boolean
  race: Race
  history: string
  images: PetImage[]
}

export interface PetImage {
  id: number;
  url: string;
  petId?: string;
}