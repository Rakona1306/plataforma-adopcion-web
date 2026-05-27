// src/presentation/hooks/useRoles.ts
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RoleFilterDto } from "../dtos/role-filter-dto";
import { roleContainer } from "@/core/infrastructure/container/organization/role-container";

export function useGetAllRoles() {
  const [filter, setFilter] = useState<RoleFilterDto>({
    page: 1,
    pageSize: 10,
    search: "",
    toDashboard: undefined,
  });
  const debouncedFilter = useMemo(() => {
    const { search, ...rest } = filter;

    // Si la búsqueda tiene contenido pero es menor a 3,
    // ignoramos el filtro de búsqueda para no llamar a la API
    return {
      ...rest,
      search: search && search.length >= 3 ? search : "",
    };
  }, [filter]);
  // La magia de React Query: la key incluye el filtro,
  // así que cada combinación de filtros genera un caché único.
  const query = useQuery({
    queryKey: ["roles", debouncedFilter],
    queryFn: () => roleContainer.getRoles(filter),
    placeholderData: (previousData) => previousData,
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
