// components/atoms/multi-search-select.tsx
"use client";
import { Autocomplete, Loader } from "@mantine/core";
import { useField } from "formik";
import { useMemo, useState } from "react";

interface Option {
  id: string;
  name: string;
  [key: string]: any;
}

interface MultiSearchSelectProps<T extends Option> {
  name: string;
  label: string;
  options: T[];
  displayField: keyof T;
  valueField: keyof T;
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
  placeholder,
  className,
  isLoading,
  onSearch,
  required,
}: MultiSearchSelectProps<T>) {
  const [field, meta, helpers] = useField<string[]>(name);
  const [searchValue, setSearchValue] = useState("");

  const selectedIds: string[] = field.value ?? [];

  // Opciones que aún no fueron seleccionadas
  const availableOptions = useMemo(
  () => {
    // Aseguramos que options siempre sea un array
    const list = options || [];
    return list.filter((o) => !selectedIds.includes(String(o[valueField])));
  },
  // Agregamos [valueField] al array de dependencias por si acaso
  [options, selectedIds, valueField],
);

  const data = useMemo(
    () => availableOptions.map((o) => String(o[displayField])),
    [availableOptions, displayField],
  );

  // Objetos completos de los seleccionados (para mostrar el label)
  const selectedItems = useMemo(
    () =>
      selectedIds
        .map((id) => options.find((o) => String(o[valueField]) === id))
        .filter(Boolean) as T[],
    [selectedIds, options, valueField],
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
    helpers.setValue([...selectedIds, String(selected[valueField])]);
    setSearchValue("");
    onSearch?.("");
  };

  const handleRemove = (id: string) => {
    helpers.setValue(selectedIds.filter((v) => v !== id));
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
        clearable
        data={data}
        placeholder={placeholder ?? "Buscar..."}
        rightSection={isLoading ? <Loader size="xs" /> : null}
        error={hasError ? (meta.error as string) : undefined}
      />

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedItems.map((item) => (
            <span
              onClick={() => handleRemove(String(item[valueField]))}
              key={String(item[valueField])}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-full"
            >
              {String(item[displayField])}
              <button
                type="button"
                className="hover:text-blue-900 transition"
                aria-label={`Eliminar ${String(item[displayField])}`}
              >
                <i className="ti ti-x text-xs" aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
