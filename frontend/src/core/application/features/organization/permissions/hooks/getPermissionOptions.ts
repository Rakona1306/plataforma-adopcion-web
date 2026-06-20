// src/presentation/hooks/security/usePermissionOptions.ts
import { useQuery } from "@tanstack/react-query";
import { permissionContainer } from "@/core/infrastructure/container/organization/permission-container";
import { permissionMapper } from "../mapper/permission-mapper";

export const usePermissionOptions = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['permissions'],
    queryFn: () => permissionContainer.getPermissions()
  });

  // Mapeamos los datos en cuanto llegan
  const options = data ? permissionMapper(data) : [];

  return { options, ...rest };
};