import { PetFilterDto } from "@/core/application/features/shelter/pets/dtos/pet-filter-dto";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { petService } from "../services/pet.service";
import { useState } from "react";

const INITIAL_FILTER: PetFilterDto = {
  page: 1,
  pageSize: 10,
};

export default function useGetPetMostRequested() {
  const [filter, setFilter] = useState<PetFilterDto>(INITIAL_FILTER);

  const query = useQuery({
    queryKey: [
      QUERY_KEYS.SHELTER.PET.PRIVATE,
      QUERY_KEYS.SHELTER.PET.MOST_REQUESTED,
      filter,
    ],
    queryFn: () => petService.mostRequested(filter),
  });

  const updateFilter = (newFilter: Partial<PetFilterDto>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  const handleClear = () => {
    setFilter(INITIAL_FILTER);
  };

  return {
    ...query,
    filter,
    updateFilter,
    handleClear,
  };
}
