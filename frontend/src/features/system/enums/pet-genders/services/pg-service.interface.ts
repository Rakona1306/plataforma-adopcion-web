import { PetGenders } from "../model/pet-genders.model";

export interface IPetGendersService {
  getAll(): Promise<PetGenders[]>;
}