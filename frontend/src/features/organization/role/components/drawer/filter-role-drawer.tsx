"use client";

import { useId, useMemo } from "react";
import { Box, Divider, Flex, Pill, Text } from "@mantine/core";
import ButtonUI from "@/components/ui/atoms/button/button-ui";
import {
  StackableKey,
  useRoleFilterStore,
} from "@/features/organization/role/store/role-filter-user.store";
import { useGetAllRoles } from "@/features/organization/role/hooks/use-get-all-role";
import { montserrat } from "@/lib/fonts/monserrat";
import FilterToDashboardDisclosure from "@/features/organization/role/components/disclosure/filter-to-dashboard-disclosure";
import FilterPermissionDisclosure from "../disclosure/filter-permisson-disclosure";

// district sigue siendo estático; permissionId ya NO va aquí porque su catálogo
// vive en useGetAllRoles (mismo hook que usa FilterRoleDisclosure), y se
// resuelve dinámicamente más abajo con permissionLabels.

const TO_DASHBOARD_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "true", label: "Si" },
  { value: "false", label: "No" },
];

const STACKABLE_KEYS: StackableKey[] = ["permissionId"];

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

export default function FilterRoleDrawer({ onApply }: FilterUserDrawerProps) {
  const id = useId();

  // Mismo hook que usa FilterRoleDisclosure por dentro. React Query
  // cachea por queryKey, así que esta llamada NO dispara un segundo fetch
  // si ambos componentes piden el mismo filtro — solo nos da acceso a la
  // data para poder resolver el label del chip aquí.
  const { data: permissionsData } = useGetAllRoles();
  const permissionLabels = useMemo(() => {
    const permissions =
      permissionsData?.items.flatMap((role) => role.permissions ?? []) ?? [];

    return Object.fromEntries(
      permissions.map((permission) => [permission.id, permission.name]),
    );
  }, [permissionsData]);

  // Selectores primitivos/array puro. Cada uno solo cambia de referencia
  // cuando SU campo cambia en el store, así evitamos renders de más al
  // tocar otros filtros que no afectan a este drawer (page, search, sort).
  const permissionId = useRoleFilterStore((s) => s.permissionId);
  const toDashboard = useRoleFilterStore((s) => s.toDashboard);

  const toggleStackedValue = useRoleFilterStore((s) => s.toggleStackedValue);
  const removeStackedValue = useRoleFilterStore((s) => s.removeStackedValue);
  const updateFilter = useRoleFilterStore((s) => s.updateFilter);
  const handleClear = useRoleFilterStore((s) => s.handleClear);

  // Convierte un value crudo (lo que se manda al backend) al label legible
  // que se muestra en el chip. permissionId sale del catálogo real (permissionLabels);
  // district sigue siendo estático por ahora.
  const resolveStackedLabel = (key: StackableKey, value: string): string => {
    if (key === "permissionId") return permissionLabels[value] ?? value;

    return value;
  };

  const filters = useMemo<FilterChip[]>(() => {
    const stackedValues: Record<StackableKey, string[]> = { permissionId };

    const stackedChips: FilterChip[] = STACKABLE_KEYS.flatMap((key) =>
      stackedValues[key].map((value) => ({
        type: "stacked" as const,
        key,
        value,
        label: resolveStackedLabel(key, value),
      })),
    );

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

    return [...stackedChips, ...toDashboardChip];
  }, [permissionId, permissionLabels, toDashboard]);

  const handleRemoveFilter = (chip: FilterChip) => {
    if (chip.type === "stacked") {
      removeStackedValue(chip.key, chip.value);
      return;
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
          <FilterPermissionDisclosure
            filterKey="permissionId"
            selected={permissionId}
            onToggle={toggleStackedValue}
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
