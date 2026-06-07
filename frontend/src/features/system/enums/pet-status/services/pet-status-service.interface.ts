import { PetStatus } from "../model/pet-status.model";

export interface IPetStatusService {
  getAll(): Promise<PetStatus[]>;
}