"use client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { UserFilterDto } from "../../../../core/application/features/organization/user/dtos/user-filter-dto";
import { useQuery } from "@tanstack/react-query";
import { useUserFilterStore } from "@/features/organization/user/store/use-filter-user.store";
import { useShallow } from "zustand/shallow";
import { userService } from "../services/user.service";

function joinStacked(values: string[]): string | undefined {
  return values.length > 0 ? values.join("|") : undefined;
}

export function useGetAllUser() {
  const router = useRouter();

  // Estado global compartido por cualquier componente que use este hook
  const filter = useUserFilterStore(
    useShallow((s) => ({
      page: s.page,
      pageSize: s.pageSize,
      search: s.search,
      roleId: s.roleId,
      isBlocked: s.isBlocked,
      district: s.district,
      sort: s.sort,
      toDashboard: s.toDashboard,
    })),
  );
  const updateFilter = useUserFilterStore((s) => s.updateFilter);
  const addStackedValue = useUserFilterStore((s) => s.addStackedValue);
  const removeStackedValue = useUserFilterStore((s) => s.removeStackedValue);
  const toggleStackedValue = useUserFilterStore((s) => s.toggleStackedValue);
  const handleClear = useUserFilterStore((s) => s.handleClear);

  // Filtro "aplanado" listo para el backend (roleId/isBlocked como "a|b|c")
  const requestFilter = useMemo((): UserFilterDto => {
    const { search, roleId, ...rest } = filter;

    return {
      ...rest,
      search: search && search.length >= 3 ? search : "",
      roleId: joinStacked(roleId),
      district: joinStacked(filter.district),
    } as UserFilterDto;
  }, [filter]);

  const query = useQuery({
    queryKey: ["users", requestFilter],
    queryFn: () => userService.get(requestFilter),
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

  return {
    ...query,
    filter, // estado "crudo" con arrays, ideal para pintar chips seleccionados
    requestFilter, // lo que realmente se manda al backend
    updateFilter,
    addStackedValue,
    removeStackedValue,
    toggleStackedValue,
    handleClear,
  };
}
