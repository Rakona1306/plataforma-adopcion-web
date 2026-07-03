/* eslint-disable @typescript-eslint/no-explicit-any */
// src/presentation/hooks/useRoles.ts
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RoleFilterDto } from "../dtos/role-filter-dto";
import { roleContainer } from "@/core/infrastructure/container/organization/role-container";
import { useRouter } from "next/navigation";
import { roleService } from "../services/role.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useGetAllRoles() {
  const router = useRouter();
  const [filter, setFilter] = useState<RoleFilterDto>({
    page: 1,
    pageSize: 10,
    search: "",
    toDashboard: undefined,
  });
  const debouncedFilter = useMemo(() => {
    const { search, ...rest } = filter;

    return {
      ...rest,
      search: search && search.length >= 3 ? search : "",
    };
  }, [filter]);

  const query = useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATION.ROLE, debouncedFilter],
    queryFn: () => roleService.get(filter),
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

  const updateFilter = (newFilter: Partial<RoleFilterDto>) => {
    setFilter((prev) => ({ ...prev, ...newFilter, page: 1 }));
  };

  const handleClear = () => {
    updateFilter({ search: "", toDashboard: undefined });
  };

  return {
    ...query,
    filter,
    updateFilter,
    handleClear,
  };
}
