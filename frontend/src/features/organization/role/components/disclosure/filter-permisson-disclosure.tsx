import DisclosureFilterGroup from "@/components/ui/molecules/disclosures/disclosure-filter-group";
import { useGetAllRoles } from "../../hooks/use-get-all-role";
import { useMemo } from "react";

interface Props<TKey extends string> {
  filterKey: TKey;
  selected: string[];
  onToggle: (key: TKey, value: string) => void;
}

export default function FilterPermissionDisclosure<TKey extends string>(
  props: Props<TKey>,
) {
  const { data: rolesData, isLoading, isFetching } = useGetAllRoles();

  const permissionOptions = useMemo(() => {
    const permissions =
      rolesData?.items.flatMap((role) => role.permissions ?? []) ?? [];

    // Elimina permisos duplicados
    const uniquePermissions = Array.from(
      new Map(
        permissions.map((permission) => [permission.id, permission]),
      ).values(),
    );

    return uniquePermissions.map((permission) => ({
      value: permission.id,
      label: permission.name,
    }));
  }, [rolesData]);

  return (
    <DisclosureFilterGroup<TKey>
      title="Permisos"
      options={permissionOptions}
      isLoading={isLoading || !rolesData}
      isFetching={isFetching}
      defaultExpanded={false}
      {...props}
    />
  );
}
