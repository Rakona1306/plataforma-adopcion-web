import { Pet } from "@/core/domain/models/shelter/pet";

export interface IPetService {
  getById(id: string): Promise<Pet>;
}