"use client"
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { UserFilterDto } from "../dtos/user-filter-dto";
import { useQuery } from "@tanstack/react-query";
import { userContainer } from "@/core/infrastructure/container/organization/user-container";

export function useGetAllUser() {
  const router = useRouter();
  const [filter, setFilter] = useState<UserFilterDto>({
    page: 1,
    pageSize: 10,
    search: "",
    isBlocked: undefined,
    roleId: undefined,
  });

  const debouncedFilter = useMemo(() => {
    const { search, ...rest } = filter;

    return {
      ...rest,
      search: search && search.length >= 3 ? search : "",
    };
  }, [filter]);

  const query = useQuery({
    queryKey: ["users", debouncedFilter],
    queryFn: () => userContainer.getUsers(filter),
    placeholderData: (previousData) => previousData,
    throwOnError: (error: any) => {
      if (error.response?.status === 401 || error.status === 401) {
        router.push("/login");
        return false; // Evitamos que React Query propague el error al Boundary si no queremos
      }
      return true; // Propaga otros errores
    },
    enabled: !filter.search || filter.search.length >= 3,
  });

  const updateFilter = (newFilter: Partial<UserFilterDto>) => {
    setFilter((prev) => ({ ...prev, ...newFilter, page: 1 }));
  };

  const handleClear = () => {
    updateFilter({ search: "", isBlocked: undefined, roleId: undefined });
  };

  return {
    ...query,
    filter,
    updateFilter,
    handleClear,
  };
}
