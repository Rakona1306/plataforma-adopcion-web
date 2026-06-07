"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { traitContainer } from "@/core/infrastructure/container/shelter/trait-container";
import { TraitFilterDto } from "../dto/trait-filter-dto";

export function useGetAllTrait() {
  const router = useRouter();

  const [filter, setFilter] = useState<TraitFilterDto>({
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
    queryKey: ["traits", debouncedFilter],

    queryFn: () =>
      traitContainer.getAll(debouncedFilter),

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
    newFilter: Partial<TraitFilterDto>
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