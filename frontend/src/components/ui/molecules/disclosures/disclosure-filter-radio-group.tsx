"use client";

import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Collapse,
  Divider,
  Group,
  Pagination,
  Radio,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { PiCaretDownLight } from "react-icons/pi";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DisclosureFilterOption } from "./disclosure-filter-group";
import { montserrat } from "@/lib/fonts/monserrat";

interface DisclosureFilterRadioGroupProps<TKey extends string> {
  title: string;
  filterKey: TKey;
  options: DisclosureFilterOption[];
  /** Valor único seleccionado para esta key. "" (o undefined) = ninguno elegido. */
  selected?: string;
  onSelect: (key: TKey, value: string) => void;
  /** Si true, hacer click en la opción ya elegida la deselecciona (vuelve a ""). */
  allowClear?: boolean;
  defaultExpanded?: boolean;
  /**
   * A partir de cuántas opciones se activa el buscador y la paginación.
   * Con menos opciones que esto, se muestra la lista simple.
   */
  pageSize?: number;
  /** Muestra un skeleton en vez de la lista mientras el catálogo carga. */
  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZE = 6;

/**
 * Igual que DisclosureFilterGroup, pero para campos de selección ÚNICA
 * (un solo value en el store, no un array — ej. isBlocked, sort).
 * Misma UI: disclosure colapsable, buscador + paginación si hay muchas
 * opciones, y la opción elegida siempre visible arriba, sin importar la
 * búsqueda o la página actual.
 */
export default function DisclosureFilterRadioGroup<TKey extends string>({
  title,
  filterKey,
  options,
  selected = "",
  onSelect,
  allowClear = true,
  defaultExpanded = true,
  pageSize = DEFAULT_PAGE_SIZE,
  isLoading = false,
}: DisclosureFilterRadioGroupProps<TKey>) {
  const [expanded, { toggle }] = useDisclosure(defaultExpanded);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const needsSearchAndPagination = options.length > pageSize;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selected) ?? null,
    [options, selected],
  );

  const normalizedSearch = search.trim().toLowerCase();

  const unselectedOptions = useMemo(() => {
    const rest = options.filter((option) => option.value !== selected);
    if (!normalizedSearch) return rest;
    return rest.filter((option) =>
      option.label.toLowerCase().includes(normalizedSearch),
    );
  }, [options, selected, normalizedSearch]);

  const totalPages = Math.max(
    1,
    Math.ceil(unselectedOptions.length / pageSize),
  );
  // Por si la página guardada quedó fuera de rango (ej. tras una búsqueda
  // que redujo los resultados).
  const safePage = Math.min(page, totalPages);

  const paginatedUnselected = useMemo(
    () =>
      unselectedOptions.slice((safePage - 1) * pageSize, safePage * pageSize),
    [unselectedOptions, safePage, pageSize],
  );

  if (isLoading) {
    return <Skeleton w="100%" h={44} radius="md" />;
  }

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // toda búsqueda nueva reinicia la paginación
  };

  const handleSelect = (value: string) => {
    if (allowClear && value === selected) {
      onSelect(filterKey, "");
      return;
    }
    onSelect(filterKey, value);
  };

  const hasNoResults = !selectedOption && paginatedUnselected.length === 0;

  return (
    <Box>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3",
          "text-slate-900 font-bold",
          "bg-white border border-gray-200 transition-all duration-300",
          montserrat.className,
          expanded
            ? "rounded-t-md border-b-transparent"
            : "rounded-md hover:border-gray-300 hover:bg-gray-50",
        )}
      >
        <Text size="sm" fw={500}>
          {title}
          {selectedOption ? ` (${selectedOption.label})` : ""}
        </Text>
        <PiCaretDownLight
          size={16}
          className={cn(
            "text-slate-800 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      <Collapse expanded={expanded} transitionDuration={200}>
        <div className="border border-t-0 border-gray-200 rounded-b-md bg-white p-3 flex flex-col gap-5">
          {needsSearchAndPagination ? (
            <TextInput
              placeholder={`Buscar en ${title.toLowerCase()}...`}
              leftSection={<SearchIcon size={14} />}
              value={search}
              onChange={(event) =>
                handleSearchChange(event.currentTarget.value)
              }
              size="xs"
            />
          ) : null}

          {selectedOption ? (
            <div className="flex flex-col gap-4">
              <Radio
                checked
                label={selectedOption.label}
                onChange={() => handleSelect(selectedOption.value)}
                classNames={{
                  radio: "checked:bg-primary! checked:border-primary!",
                  label: "text-sm text-gray-700 cursor-pointer",
                }}
              />
            </div>
          ) : null}

          {selectedOption && paginatedUnselected.length > 0 ? (
            <Divider />
          ) : null}

          {paginatedUnselected.length > 0 ? (
            <div className="flex flex-col gap-4">
              {paginatedUnselected.map((option) => (
                <Radio
                  key={option.value}
                  checked={false}
                  label={option.label}
                  onChange={() => handleSelect(option.value)}
                  classNames={{
                    radio: "checked:bg-primary! checked:border-primary!",
                    label: "text-sm text-gray-700 cursor-pointer",
                  }}
                />
              ))}
            </div>
          ) : null}

          {hasNoResults ? (
            <Text size="xs" className="text-gray-400! text-center! py-2!">
              No hay resultados...
            </Text>
          ) : null}

          {needsSearchAndPagination && totalPages > 1 ? (
            <Group justify="center" mt="xs">
              <Pagination
                size="xs"
                total={totalPages}
                value={safePage}
                onChange={setPage}
              />
            </Group>
          ) : null}
        </div>
      </Collapse>
    </Box>
  );
}
