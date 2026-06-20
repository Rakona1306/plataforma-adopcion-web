// components/atoms/multi-search-select.tsx
"use client";
import { Autocomplete, Loader } from "@mantine/core";
import { useField } from "formik";
import { useMemo, useState, useEffect } from "react";

interface Option {
  id: string;
  name: string;
  [key: string]: any;
}

interface DiffValue {
  addIds: string[];
  removeIds: string[];
}

interface MultiSearchSelectProps<T extends Option> {
  name: string;
  label: string;
  options: T[];
  displayField: keyof T;
  valueField: keyof T;
  /** Items que ya tiene la mascota al cargar el formulario */
  defaultItems?: T[];
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
  onSearch?: (value: string) => void;
  required?: boolean;
}

export function MultiSearchSelect<T extends Option>({
  name,
  label,
  options,
  displayField,
  valueField,
  defaultItems = [],
  placeholder,
  className,
  isLoading,
  onSearch,
  required,
}: MultiSearchSelectProps<T>) {
  const [, meta, helpers] = useField<DiffValue>(name);
  const [searchValue, setSearchValue] = useState("");

  // IDs originales (los que tenía la mascota al abrir el form)
  const defaultIds = useMemo(
    () => defaultItems.map((i) => String(i[valueField])),
    // Solo recalcular si cambian los defaultItems
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Estado local: IDs actualmente visibles en la UI
  const [currentIds, setCurrentIds] = useState<string[]>(defaultIds);

  // Sincronizar Formik cada vez que currentIds cambia
  useEffect(() => {
    const addIds = currentIds.filter((id) => !defaultIds.includes(id));
    const removeIds = defaultIds.filter((id) => !currentIds.includes(id));
    helpers.setValue({ addIds, removeIds });
    // helpers no es estable, ignorar en deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIds]);

  // Pool de opciones disponibles para buscar (las que no están ya seleccionadas)
  const availableOptions = useMemo(() => {
    const list = options || [];
    return list.filter((o) => !currentIds.includes(String(o[valueField])));
  }, [options, currentIds, valueField]);

  const autocompleteData = useMemo(
    () => availableOptions.map((o) => String(o[displayField])),
    [availableOptions, displayField],
  );

  // Para mostrar los chips: unir defaultItems + opciones recién añadidas
  const allKnownOptions = useMemo(() => {
    const map = new Map<string, T>();
    defaultItems.forEach((i) => map.set(String(i[valueField]), i));
    options.forEach((i) => map.set(String(i[valueField]), i));
    return map;
  }, [defaultItems, options, valueField]);

  const selectedItems = useMemo(
    () => currentIds.map((id) => allKnownOptions.get(id)).filter(Boolean) as T[],
    [currentIds, allKnownOptions],
  );

  const handleChange = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleOptionSubmit = (label: string) => {
    const selected = availableOptions.find(
      (o) => String(o[displayField]) === label,
    );
    if (!selected) return;
    setCurrentIds((prev) => [...prev, String(selected[valueField])]);
    setSearchValue("");
    onSearch?.("");
  };

  const handleRemove = (id: string) => {
    setCurrentIds((prev) => prev.filter((v) => v !== id));
  };

  const hasError = meta.touched && Boolean(meta.error);

  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Autocomplete
        value={searchValue}
        onChange={handleChange}
        onOptionSubmit={handleOptionSubmit}
        data={autocompleteData}
        placeholder={placeholder ?? "Buscar..."}
        rightSection={isLoading ? <Loader size="xs" /> : null}
        error={hasError ? (meta.error as string) : undefined}
      />

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedItems.map((item) => {
            const id = String(item[valueField]);
            const isNew = !defaultIds.includes(id);
            return (
              <span
                key={id}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full border
                  transition-colors cursor-default
                  ${isNew
                    ? "bg-green-700 text-white border-green-200"
                    : "bg-primary text-white border-secondary"
                  }
                `}
              >
                {String(item[displayField])}
                <button
                  type="button"
                  onClick={() => handleRemove(id)}
                  className="hover:opacity-70 transition"
                  aria-label={`Eliminar ${String(item[displayField])}`}
                >
                  <i className="ti ti-x text-xs" aria-hidden="true" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Leyenda visual cuando hay cambios */}
      {(selectedItems.some((i) => !defaultIds.includes(String(i[valueField]))) ||
        defaultIds.some((id) => !currentIds.includes(id))) && (
          <p className="text-xs text-slate-400 mt-0.5">
            <span className="text-green-700 font-medium">Verde</span> = nuevo ·{" "}
            <span className="text-primary font-medium">Guinda</span> = existente
          </p>
        )}
    </div>
  );
}