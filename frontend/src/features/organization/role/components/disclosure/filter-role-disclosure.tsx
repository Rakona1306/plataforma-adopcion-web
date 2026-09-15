import DisclosureFilterGroup from "@/components/ui/molecules/disclosures/disclosure-filter-group";
import { useGetAllRoles } from "../../hooks/use-get-all-role";
import { useMemo } from "react";

interface Props<TKey extends string> {
  filterKey: TKey;
  selected: string[];
  onToggle: (key: TKey, value: string) => void;
}

export default function FilterRoleDisclosure<TKey extends string>(
  props: Props<TKey>,
) {
  const {
    data: rolesData,
    isLoading,
    updateFilter,
    isFetching,
  } = useGetAllRoles(6);

  const roleOptions = useMemo(
    () =>
      (rolesData?.items ?? []).map((role) => ({
        value: role.id.toString(),
        label: role.name,
      })),
    [rolesData],
  );

  return (
    <DisclosureFilterGroup<TKey>
      title="Roles"
      options={roleOptions}
      isLoading={isLoading || !rolesData}
      isFetching={isFetching}
      defaultExpanded={false}
      pagination={{
        totalPages: rolesData?.totalPages || 1,
        currentPage: rolesData?.page || 1,
        onChangePage: (page) => updateFilter({ page }),
      }}
      {...props}
    />
  );
}
