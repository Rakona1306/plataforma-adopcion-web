import { VaccineFilterDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-filter-dto";
import { Vaccine } from "../../models/shelter/vaccine";
import { Paginate } from "../../models/system/paginate";
import { VaccineCreateDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-create-dto";
import { VaccineUpdateDto } from "@/core/application/features/shelter/vaccines/dtos/vaccine-update-dto";

export interface IVaccineRepository {
  getAll(filter: VaccineFilterDto): Promise<Paginate<Vaccine>>;
  create(dto: VaccineCreateDto): Promise<void>;
  update(id: string, dto: VaccineUpdateDto): Promise<void>;
  delete(id: string): Promise<void>;
}