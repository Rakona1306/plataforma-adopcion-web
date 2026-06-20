"use client";
import { Autocomplete, Loader } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

interface SearchSelectProps<T extends Record<string, any>> {
  options: T[];
  displayField: keyof T;
  valueField: keyof T;
  label?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  isLoading?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  filterValue?: string;
}

export function SearchSelectComp<T extends Record<string, any>>(
  props: SearchSelectProps<T>
) {

  const [searchValue, setSearchValue] = useState(
    props.defaultValue ?? ""
  );

  const isControlled = props.filterValue !== undefined;
  const currentValue = isControlled && props.filterValue === ""
    ? ""
    : searchValue;

  const data = useMemo(
    () =>
      props.options.map((item) =>
        String(item[props.displayField])
      ),
    [props.options, props.displayField]
  );

  const handleChange = (value: string) => {
    setSearchValue(value);
    props.onSearch?.(value);

    const selected = props.options.find(
      (item) => String(item[props.displayField]) === value
    );

    if (!selected) {
      props.onChange?.("");
    }
  };

  const handleOptionSubmit = (labelSelected: string) => {
    const selected = props.options.find(
      (item) => String(item[props.displayField]) === labelSelected
    );

    if (!selected) return;

    const valueToSave = String(selected[props.valueField]);
    props.onChange?.(valueToSave);
    setSearchValue(labelSelected);
  };


  return (
    <Autocomplete
      label={props.label}
      className={props.className ?? "w-full md:"}
      value={currentValue}
      onChange={handleChange}
      onOptionSubmit={handleOptionSubmit}
      data={data}
      placeholder={props.placeholder ?? "Buscar..."}
      rightSection={props.isLoading ? <Loader size="xs" /> : null}
      error={props.error}
    />
  );
}