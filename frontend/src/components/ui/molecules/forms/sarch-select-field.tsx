"use client";

import {
  Combobox,
  Group,
  Loader,
  TextInput,
  useCombobox,
  Input,
} from "@mantine/core";
import { useField } from "formik";
import { SearchIcon } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

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

  required?: boolean;
  description?: string;

  /** Render custom de cada opción en el dropdown */
  renderOption?: (item: T) => ReactNode;
  /** Render custom de la opción seleccionada (dentro del input) */
  renderSelected?: (item: T) => ReactNode;
}

export function SearchSelectField<T>({
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
  renderOption,
  renderSelected,
}: Props<T>) {
  const [field, meta, helpers] = useField(name);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selectedOption = useMemo(() => {
    return options.find(
      (item) => String(item[valueField]) === String(field.value),
    );
  }, [options, field.value, valueField]);

  const [search, setSearch] = useState(
    selectedOption ? String(selectedOption[displayField]) : defaultValue || "",
  );

  // Patrón recomendado por React para sincronizar el estado local cuando cambia una prop o valor externo (sin useEffect)
  const [prevFieldValue, setPrevFieldValue] = useState(field.value);
  if (field.value !== prevFieldValue) {
    setPrevFieldValue(field.value);
    setSearch(selectedOption ? String(selectedOption[displayField]) : "");
  }

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearch?.(value);

    // Si el texto ya no matchea la opción seleccionada, limpiamos el value real
    if (!selectedOption || String(selectedOption[displayField]) !== value) {
      helpers.setValue("");
    }

    combobox.openDropdown();
    combobox.updateSelectedOptionIndex();
  };

  const handleOptionSubmit = (val: string) => {
    const selected = options.find((item) => String(item[valueField]) === val);

    if (!selected) return;

    helpers.setValue(selected[valueField]);
    setSearch(String(selected[displayField]));
    combobox.closeDropdown();
  };

  const optionItems = options.map((item) => {
    const value = String(item[valueField]);
    return (
      <Combobox.Option value={value} key={value}>
        {renderOption ? renderOption(item) : String(item[displayField])}
      </Combobox.Option>
    );
  });

  return (
    <Combobox store={combobox} onOptionSubmit={handleOptionSubmit}>
      <Combobox.Target>
        <Input.Wrapper
          label={label}
          description={description}
          required={required}
          error={meta.touched ? meta.error : undefined}
          className={className}
          classNames={{
            description: "mb-1!",
          }}
        >
          {/* Si hay item seleccionado y se pasó renderSelected, mostramos ese custom render
                    superpuesto; si no, el input de texto normal */}
          {selectedOption && renderSelected ? (
            <Group
              gap="xs"
              className="border rounded-md px-2 py-1 cursor-pointer"
              onClick={() => combobox.toggleDropdown()}
            >
              {renderSelected(selectedOption)}
            </Group>
          ) : (
            <TextInput
              value={search}
              onChange={(e) => handleSearchChange(e.currentTarget.value)}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => combobox.closeDropdown()}
              placeholder={placeholder ?? "Buscar..."}
              leftSection={
                isLoading ? <Loader size="xs" /> : <SearchIcon width={20} />
              }
              classNames={{ input: "mb-2" }}
            />
          )}
        </Input.Wrapper>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={280} style={{ overflowY: "auto" }}>
          {optionItems.length > 0 ? (
            optionItems
          ) : (
            <Combobox.Empty>
              {isLoading ? "Buscando..." : "Sin resultados"}
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
