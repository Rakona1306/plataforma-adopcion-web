"use client";

import { useId, useMemo } from "react";
import { Box, Divider, Flex, Pill, Text } from "@mantine/core";
import ButtonUI from "@/components/ui/atoms/button/button-ui";
import {
  StackableKey,
  useUserFilterStore,
} from "@/features/organization/user/store/use-filter-user.store";
import FilterRoleDisclosure from "@/features/organization/role/components/disclosure/filter-role-disclosure";
import { useGetAllRoles } from "@/features/organization/role/hooks/use-get-all-role";
import { montserrat } from "@/lib/fonts/monserrat";
import FilterDistrictDisclosure from "../disclosures/filter-district-disclosure";
import { limaDistricts } from "@/core/shared/constants/distritcts";
import FilterIsBlockedDisclosure from "../disclosures/filter-is-blocked-disclosure";
import FilterToDashboardDisclosure from "@/features/organization/role/components/disclosure/filter-to-dashboard-disclosure";

// district sigue siendo estático; roleId ya NO va aquí porque su catálogo
// vive en useGetAllRoles (mismo hook que usa FilterRoleDisclosure), y se
// resuelve dinámicamente más abajo con roleLabels.
const DISTRICT_LABELS: Record<string, string> = Object.fromEntries(
  limaDistricts.map((o) => [o.value, o.label]),
);

const IS_BLOCKED_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "false", label: "Activo" },
  { value: "true", label: "Bloqueado" },
];

const TO_DASHBOARD_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "true", label: "Si" },
  { value: "false", label: "No" },
];

const STACKABLE_KEYS: StackableKey[] = ["roleId", "district"];

type StackedChip = {
  type: "stacked";
  key: StackableKey;
  value: string;
  label: string;
};

type SingleChip = {
  type: "single";
  field: "isBlocked";
  label: string;
};

type SingleChipToDashboard = {
  type: "single";
  field: "toDashboard";
  label: string;
};

type FilterChip = StackedChip | SingleChip | SingleChipToDashboard;

interface FilterUserDrawerProps {
  /** Se ejecuta al presionar "Aplicar filtros" (normalmente cierra el Drawer padre). */
  onApply?: () => void;
}

export default function FilterUserDrawer({ onApply }: FilterUserDrawerProps) {
  const id = useId();

  // Mismo hook que usa FilterRoleDisclosure por dentro. React Query
  // cachea por queryKey, así que esta llamada NO dispara un segundo fetch
  // si ambos componentes piden el mismo filtro — solo nos da acceso a la
  // data para poder resolver el label del chip aquí.
  const { data: rolesData } = useGetAllRoles();

  const roleLabels = useMemo(
    () =>
      Object.fromEntries(
        (rolesData?.items ?? []).map((role) => [role.id.toString(), role.name]),
      ),
    [rolesData],
  );

  // Selectores primitivos/array puro. Cada uno solo cambia de referencia
  // cuando SU campo cambia en el store, así evitamos renders de más al
  // tocar otros filtros que no afectan a este drawer (page, search, sort).
  const roleId = useUserFilterStore((s) => s.roleId);
  const district = useUserFilterStore((s) => s.district);
  const isBlocked = useUserFilterStore((s) => s.isBlocked);
  const toDashboard = useUserFilterStore((s) => s.toDashboard);

  const toggleStackedValue = useUserFilterStore((s) => s.toggleStackedValue);
  const removeStackedValue = useUserFilterStore((s) => s.removeStackedValue);
  const updateFilter = useUserFilterStore((s) => s.updateFilter);
  const handleClear = useUserFilterStore((s) => s.handleClear);

  // Convierte un value crudo (lo que se manda al backend) al label legible
  // que se muestra en el chip. roleId sale del catálogo real (roleLabels);
  // district sigue siendo estático por ahora.
  const resolveStackedLabel = (key: StackableKey, value: string): string => {
    if (key === "roleId") return roleLabels[value] ?? value;
    return DISTRICT_LABELS[value] ?? value;
  };

  const filters = useMemo<FilterChip[]>(() => {
    const stackedValues: Record<StackableKey, string[]> = { roleId, district };

    const stackedChips: FilterChip[] = STACKABLE_KEYS.flatMap((key) =>
      stackedValues[key].map((value) => ({
        type: "stacked" as const,
        key,
        value,
        label: resolveStackedLabel(key, value),
      })),
    );

    const isBlockedChip: FilterChip[] =
      isBlocked === ""
        ? []
        : [
            {
              type: "single" as const,
              field: "isBlocked" as const,
              label:
                IS_BLOCKED_OPTIONS.find((o) => o.value === isBlocked)?.label ??
                isBlocked,
            },
          ];

    const toDashboardChip: FilterChip[] =
      toDashboard === ""
        ? []
        : [
            {
              type: "single" as const,
              field: "toDashboard" as const,
              label:
                TO_DASHBOARD_OPTIONS.find((o) => o.value === toDashboard)
                  ?.label ?? toDashboard,
            },
          ];

    return [...stackedChips, ...isBlockedChip, ...toDashboardChip];
  }, [roleId, district, isBlocked, roleLabels, toDashboard]);

  const handleRemoveFilter = (chip: FilterChip) => {
    if (chip.type === "stacked") {
      removeStackedValue(chip.key, chip.value);
      return;
    }
    if (chip.type === "single" && chip.field === "isBlocked") {
      updateFilter({ isBlocked: "" });
    }

    if (chip.type === "single" && chip.field === "toDashboard") {
      updateFilter({ toDashboard: "" });
    }
  };

  const handleCleanFilters = () => {
    handleClear();
  };

  const handleApplyFilters = () => {
    // Cada click en los controles de abajo ya actualizó el store (y por lo
    // tanto ya disparó el fetch vía useGetAllUser), así que solo cerramos.
    onApply?.();
  };

  return (
    <>
      <Flex direction="column" gap="sm">
        <Divider my="sm" />

        <Text size="sm" fw="600" mb="lg">
          Filtros Seleccionados
        </Text>

        <Box w="100%" mih="40px" display="flex" className="items-center!">
          {filters.length === 0 ? (
            <Text
              size="sm"
              className={`text-gray-400! font-bold! ${montserrat.className}`}
            >
              No hay filtros seleccionados...
            </Text>
          ) : (
            <Flex gap="0.25rem" wrap="wrap" w="100%">
              {filters.map((item, index) => (
                <Pill
                  key={`${id}:${item.type}:${index}`}
                  classNames={{
                    root: "w-fit! ps-4! pe-2! py-2! h-auto! hover:bg-gray-200! transition-all duration-300",
                    remove: "text-lg!",
                  }}
                  withRemoveButton
                  onRemove={() => handleRemoveFilter(item)}
                >
                  {item.label}
                </Pill>
              ))}
            </Flex>
          )}
        </Box>

        <Divider my="sm" mt="lg" />

        <Text size="sm" fw="600" mb="lg" className={montserrat.className}>
          Filtros
        </Text>

        <div className="flex-1 overflow-y-auto min-h-0 pb-4 flex flex-col gap-5">
          <FilterRoleDisclosure
            filterKey="roleId"
            selected={roleId}
            onToggle={toggleStackedValue}
          />

          <FilterDistrictDisclosure
            filterKey="district"
            selected={district}
            onToggle={toggleStackedValue}
          />

          <FilterIsBlockedDisclosure
            filterKey="isBlocked"
            selected={isBlocked}
            onSelect={(_, value) => updateFilter({ isBlocked: value })}
            allowClear
          />

          <FilterToDashboardDisclosure
            filterKey="toDashboard"
            selected={toDashboard}
            onSelect={(_, value) => updateFilter({ toDashboard: value })}
            allowClear
          />
        </div>
      </Flex>
      <div className="shrink-0 border-t border-gray-200 pt-4 pb-4 flex gap-3">
        <ButtonUI
          intent="cancel"
          className="flex-1"
          onClick={handleCleanFilters}
        >
          Limpiar
        </ButtonUI>
        <ButtonUI
          intent="primary"
          className="flex-1"
          onClick={handleApplyFilters}
        >
          Aplicar filtros ({filters.length})
        </ButtonUI>
      </div>
    </>
  );
}
