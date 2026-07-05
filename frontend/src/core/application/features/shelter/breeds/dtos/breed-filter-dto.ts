import { FilterItem } from "@/store/use-filter-plp-store/interfaces/filter-item.interface";

export interface BreedFilterDto {
  page: number;
  pageSize: number;
  search?: string;
  storeFilters?: FilterItem[];
  activeFeatures?: string[];
  speciesId?: string;
}