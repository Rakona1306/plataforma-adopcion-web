"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SpecieFilterDto } from "../dtos/specie-filter-dto";
import { specieContainer } from "@/core/infrastructure/container/shelter/specie-container";

export function useGetAllSpecie() {
  const router = useRouter();

  const [filter, setFilter] = useState<SpecieFilterDto>({
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
    queryKey: ["species", debouncedFilter],
    queryFn: () => specieContainer.getAllSpecies(debouncedFilter),

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
    newFilter: Partial<SpecieFilterDto>
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