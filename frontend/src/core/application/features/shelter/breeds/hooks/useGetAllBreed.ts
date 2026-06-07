"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { BreedFilterDto } from "../dtos/breed-filter-dto";
import { breedContainer } from "@/core/infrastructure/container/shelter/breed-container";

export function useGetAllBreed() {
  const router = useRouter();

  const [filter, setFilter] = useState<BreedFilterDto>({
    page: 1,
    pageSize: 10,
    search: "",
    speciesId: "",
  });

  const debouncedFilter = useMemo(() => {
    const { search, ...rest } = filter;

    return {
      ...rest,
      search: search && search.length >= 3 ? search : "",
    };
  }, [filter]);

  const query = useQuery({
    queryKey: ["breeds", debouncedFilter],

    queryFn: () =>
      breedContainer.getAll(debouncedFilter),

    placeholderData: (previousData) => previousData,

    throwOnError: (error: any) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        router.push("/login");
        return false;
      }

      return true;
    },

    enabled: !filter.search || filter.search.length >= 3,
  });

  const updateFilter = (
    newFilter: Partial<BreedFilterDto>
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
      speciesId: "",
    });
  };

  return {
    ...query,
    filter,
    updateFilter,
    handleClear,
  };
}