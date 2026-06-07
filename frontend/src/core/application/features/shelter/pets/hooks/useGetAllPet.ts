"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { petContainer } from "@/core/infrastructure/container/shelter/pet-container";
import { PetFilterDto } from "../dtos/pet-filter-dto";

export function useGetAllPet() {
  const router = useRouter();

  const [filter, setFilter] = useState<PetFilterDto>({
    page: 1,
    pageSize: 10,
    search: "",
  });

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