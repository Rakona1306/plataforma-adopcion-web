// src/presentation/hooks/useRoles.ts
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { RoleFilterDto } from "../dtos/role-filter-dto";
import { useRouter } from "next/navigation";
import { roleService } from "../services/role.service";
import { useRoleFilterStore } from "../store/role-filter-user.store";
import { useShallow } from "zustand/shallow";

function joinStacked(values: string[]): string | undefined {
  return values.length > 0 ? values.join("|") : undefined;
}

export function useGetAllRoles() {
  const router = useRouter();

  const filter = useRoleFilterStore(
    useShallow((s) => ({
      page: s.page,
      pageSize: s.pageSize,
      search: s.search,
      permissionId: s.permissionId,
      sort: s.sort,
      toDashboard: s.toDashboard,
    })),
  );
  const updateFilter = useRoleFilterStore((s) => s.updateFilter);
  const addStackedValue = useRoleFilterStore((s) => s.addStackedValue);
  const removeStackedValue = useRoleFilterStore((s) => s.removeStackedValue);
  const toggleStackedValue = useRoleFilterStore((s) => s.toggleStackedValue);
  const handleClear = useRoleFilterStore((s) => s.handleClear);

  const requestFilter = useMemo((): RoleFilterDto => {
    const { search, permissionId, ...rest } = filter;
    return {
      ...rest,
      search: search && search.length >= 3 ? search : "",
      permissionId: joinStacked(permissionId),
    } as RoleFilterDto;
  }, [filter]);

  const query = useQuery({
    queryKey: ["roles", requestFilter],
    queryFn: () => roleService.get(requestFilter),
    placeholderData: (PreviousData) => PreviousData,
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
    requestFilter,
    filter,
    updateFilter,
    handleClear,
    addStackedValue,
    removeStackedValue,
    toggleStackedValue,
  };
}
