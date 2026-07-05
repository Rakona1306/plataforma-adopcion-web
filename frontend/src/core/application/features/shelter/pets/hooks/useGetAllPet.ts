"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { petContainer } from "@/core/infrastructure/container/shelter/pet-container";
import { PetFilterDto } from "../dtos/pet-filter-dto";

interface Props {
  initialFilter?: Partial<PetFilterDto>;
}

const DEFAULT_FILTER: Partial<PetFilterDto> = {
  page: 1,
  pageSize: 10,
  search: "",
  gender: 0,
  size: 0,
  specieId: "",
  status: 0,
  isAdopted: false,
};

export function useGetAllPet(props: Props = { initialFilter: DEFAULT_FILTER }) {
  const router = useRouter();

  const [filter, setFilter] = useState<Partial<PetFilterDto>>({ ...DEFAULT_FILTER, ...props.initialFilter });

  const debouncedFilter = useMemo(() => {
    const { search, ...rest } = filter;

    return {
      ...rest,
      search: search && search.length >= 3 ? search : "",
    };
  }, [filter]);

  const query = useQuery({
    queryKey: ["pets", debouncedFilter],

    queryFn: () =>
      petContainer.getAllPets(debouncedFilter),

    placeholderData: (previousData) => previousData,

    throwOnError: (error: any) => {
      if (
        error?.response?.status === 401 ||
        error?.status === 401
      ) {
        router.push("/login");
        return false;
      }

      return true;
    },

    enabled: !filter.search || filter.search.length >= 3,
  });

  const updateFilter = (
    newFilter: Partial<PetFilterDto>
  ) => {
    setFilter((prev) => ({
      ...prev,
      ...newFilter,
      page: 1,
    }));
  };

  const handleClear = () => {
    updateFilter({
      search: "",
    });
  };

  return {
    ...query,
    filter,
    updateFilter,
    handleClear,
  };
}