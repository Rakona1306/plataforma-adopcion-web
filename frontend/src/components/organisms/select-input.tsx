'use client'

import { useField, useFormikContext } from 'formik'
import { FormSelect } from '../molecules/form-select'
import { SelectOption } from '../atoms/select-field'
import { useEffect } from 'react'

interface SelectInputProps {
  name: string
  label: string
  options: SelectOption[]
  placeholder?: string
  defaultValue?: string
}

export default function SelectInput({
  name,
  label,
  options,
  placeholder,
  defaultValue,
}: SelectInputProps) {
  const [field, meta] = useField<string>(name)
  const { setFieldValue } = useFormikContext()

  console.log("options", options);
  console.log("field.value", field.value);

  useEffect(() => {
    console.log("field.name", field.name)
    console.log("field.value", field.value);
  }, [field.value]);

  return (
    <FormSelect
      label={label}
      value={field.value || defaultValue || null}
      options={options}
      placeholder={placeholder}
      error={meta.touched ? meta.error : undefined}
      onChange={(value) => setFieldValue(name, value)}
    />
  )
}