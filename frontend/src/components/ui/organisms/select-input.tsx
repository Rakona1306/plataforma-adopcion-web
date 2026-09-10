"use client";

import { useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { FormSelect } from "../molecules/form-select";
import { SelectOption } from "../atoms/select-field";

interface SelectInputProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function SelectInput({
  name,
  label,
  options,
  placeholder,
  defaultValue,
  error,
  required,
  disabled,
}: SelectInputProps) {
  const [field, meta, helpers] = useField<string>(name);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (defaultValue) {
      setFieldValue(name, defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const handleChange = (value: string | null) => {
    setFieldValue(name, value);
    // Marcamos touched al seleccionar: en selects custom el blur
    // no siempre es confiable (dropdowns/portales), así que esto
    // asegura que el error se muestre apenas el usuario interactúa.
    if (!meta.touched) {
      helpers.setTouched(true, false);
    }
  };

  const handleTouch = () => {
    if (!meta.touched) {
      helpers.setTouched(true);
    }
  };

  return (
    <FormSelect
      disabled={disabled}
      required={required}
      label={label}
      value={field.value || defaultValue || null}
      options={options}
      placeholder={placeholder}
      error={error ?? (meta.touched ? meta.error : undefined)}
      onChange={handleChange}
      onTouch={handleTouch}
    />
  );
}
