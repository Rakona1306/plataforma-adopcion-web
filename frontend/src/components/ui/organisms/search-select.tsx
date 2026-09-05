"use client";

import { Autocomplete, Loader } from "@mantine/core";
import { useField } from "formik";
import { useMemo, useState } from "react";

interface Props<T> {
  name: string;
  label: string;

  options: T[];

  displayField: keyof T;
  valueField: keyof T;

  onSearch?: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  onOptionSelected?: (option: T) => void;

  required?: boolean;
  description?: string;
}

export function SearchSelect<T>({
  name,
  label,
  options,
  displayField,
  valueField,
  onSearch,
  isLoading,
  placeholder,
  className,
  defaultValue,
  required = false,
  description,
  onOptionSelected,
}: Props<T>) {
  const [field, meta, helpers] = useField(name);

  const selectedOption = useMemo(() => {
    return options.find(
      (item) => String(item[valueField]) === String(field.value),
    );
  }, [options, field.value, valueField]);

  const [searchValue, setSearchValue] = useState(
    selectedOption ? String(selectedOption[displayField]) : defaultValue || "",
  );

  const data = useMemo(
    () => options.map((item) => String(item[displayField])),
    [options, displayField],
  );

  const handleChange = (value: string) => {
    setSearchValue(value);

    onSearch?.(value);

    const selected = options.find(
      (item) => String(item[displayField]) === value,
    );

    if (!selected) {
      helpers.setValue("");
    }
  };

  const handleOptionSubmit = (labelSelected: string) => {
    const selected = options.find(
      (item) => String(item[displayField]) === labelSelected,
    );

    if (!selected) return;

    helpers.setValue(selected[valueField]);

    setSearchValue(labelSelected);
    onOptionSelected?.(selected);
  };

  return (
    <Autocomplete
      label={label}
      description={description}
      className={className}
      value={searchValue}
      onChange={handleChange}
      onOptionSubmit={handleOptionSubmit}
      data={data}
      placeholder={placeholder ?? "Buscar..."}
      rightSection={isLoading ? <Loader size="xs" /> : null}
      error={meta.touched ? meta.error : undefined}
      required={required}
      classNames={{
        label: "text-sm! font-semibold! text-slate-700! text-start! mb-2!",
      }}
    />
  );
}
