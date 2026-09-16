"use client";

import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  Group,
  Pagination,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { PiCaretDownLight } from "react-icons/pi";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts/monserrat";

export interface DisclosureFilterOption {
  value: string;
  label: string;
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

interface DisclosureFilterGroupProps<TKey extends string> {
  title: string;
  filterKey: TKey;
  options: DisclosureFilterOption[];
  /** Valores actualmente seleccionados para esta key (ej. roleId, district). */
  selected: string[];
  onToggle: (key: TKey, value: string) => void;
  defaultExpanded?: boolean;
  /**
   * A partir de cuántas opciones se activa el buscador y la paginación.
   * Con menos opciones que esto, se muestra la lista simple, sin buscador
   * ni controles de página.
   */
  pageSize?: number;
  /** Muestra un skeleton en vez de la lista mientras el catálogo carga. */
  isLoading?: boolean;
  pagination?: PaginationProps;
  isFetching?: boolean;
}

const DEFAULT_PAGE_SIZE = 6;

/**
 * Grupo de filtros tipo "checkbox list" colapsable (disclosure), pensado
 * para campos de selección múltiple respaldados por un array en el store
 * (StackableKey). Si el catálogo de opciones supera `pageSize`, agrega
 * buscador y paginación automáticamente.
 *
 * Los valores ya seleccionados SIEMPRE se muestran fijos arriba, sin
 * importar la búsqueda o la página actual, para que el usuario nunca
 * pierda de vista lo que ya eligió mientras navega o busca.
 */
export default function DisclosureFilterGroup<TKey extends string>({
  title,
  filterKey,
  options,
  selected,
  onToggle,
  defaultExpanded = true,
  pageSize = DEFAULT_PAGE_SIZE,
  isLoading = false,
  pagination,
  isFetching = false,
}: DisclosureFilterGroupProps<TKey>) {
  const [expanded, { toggle }] = useDisclosure(defaultExpanded);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const needsSearchAndPagination = options.length > pageSize;

  const selectedOptions = useMemo(
    () => options.filter((option) => selected.includes(option.value)),
    [options, selected],
  );

  const normalizedSearch = search.trim().toLowerCase();

  const unselectedOptions = useMemo(() => {
    const rest = options.filter((option) => !selected.includes(option.value));
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

  const hasNoResults =
    selectedOptions.length === 0 && paginatedUnselected.length === 0;

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
          {selectedOptions.length > 0 ? (
            <span className="px-2 py-1 rounded-full  bg-primary text-white ms-2 text-xs">
              {selectedOptions.length}
            </span>
          ) : (
            ""
          )}
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
        {isFetching ? (
          <div className="border border-t-0 border-gray-200 rounded-b-md bg-white px-4 pt-3 pb-5 flex-col flex gap-5">
            <Skeleton w="100%" h={24} radius="md" />
            <Skeleton w="100%" h={24} radius="md" />
            <Skeleton w="100%" h={24} radius="md" />
            <Skeleton w="100%" h={24} radius="md" />
            <Skeleton w="100%" h={24} radius="md" />
            <Skeleton w="100%" h={24} radius="md" />
          </div>
        ) : (
          <div className="border border-t-0 border-gray-200 rounded-b-md bg-white px-4 pt-3 pb-5 flex-col flex gap-5">
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

            {selectedOptions.length > 0 ? (
              <div className="flex flex-col gap-4">
                {selectedOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    checked
                    label={option.label}
                    onChange={() => onToggle(filterKey, option.value)}
                    classNames={{
                      input: "checked:bg-primary! checked:border-primary!",
                      label: "text-sm text-gray-700 cursor-pointer",
                    }}
                  />
                ))}
              </div>
            ) : null}

            {selectedOptions.length > 0 && paginatedUnselected.length > 0 ? (
              <Divider />
            ) : null}

            {paginatedUnselected.length > 0 ? (
              <div className="flex flex-col gap-4">
                {paginatedUnselected.map((option) => (
                  <Checkbox
                    key={option.value}
                    checked={false}
                    label={option.label}
                    onChange={() => onToggle(filterKey, option.value)}
                    classNames={{
                      input: "checked:bg-primary! checked:border-primary!",
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

            {pagination && (
              <Group justify="center" mt="xs">
                <Pagination
                  size="xs"
                  total={pagination.totalPages}
                  value={pagination.currentPage}
                  onChange={pagination.onChangePage}
                />
              </Group>
            )}
          </div>
        )}
      </Collapse>
    </Box>
  );
}
