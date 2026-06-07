"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { VaccineFilterDto } from "../dtos/vaccine-filter-dto";
import { vaccineContainer } from "@/core/infrastructure/container/shelter/vaccine-container";

export function useGetAllVaccine() {
  const router = useRouter();

  const [filter, setFilter] = useState<VaccineFilterDto>({
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
    queryKey: ["vaccines", debouncedFilter],
    queryFn: () => vaccineContainer.getAllVaccines(debouncedFilter),

    placeholderData: (previousData) => previousData,

    throwOnError: (error: any) => {
      if (
        error.response?.status === 401 ||
        error.status === 401
      ) {
        router.push("/login");
        return false;
      }

      return true;
    },

    enabled: !filter.search || filter.search.length >= 3,
  });

  const updateFilter = (
    newFilter: Partial<VaccineFilterDto>
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