// src/components/organisms/boolean-select.tsx
'use client'

import { useField, useFormikContext } from 'formik'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'
import { SelectOptionButton } from '../atoms/select-option-button'

interface BooleanSelectProps {
  name: string
  label: string
  errorMessage?: string
}

export default function BooleanSelect({ name, label, errorMessage }: BooleanSelectProps) {
  
  const [field, meta] = useField<boolean | null>(name)
  const { setFieldValue } = useFormikContext()
  const hasError = Boolean(meta.touched && meta.error) || errorMessage !== ""

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700 text-start">{label}</label>
      
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <SelectOptionButton
          label="Sí"
          icon={<BiCheckCircle size={20} />}
          isSelected={field.value === true}
          isActiveColor="green"
          onClick={() => setFieldValue(name, true)} // El componente setea el valor por sí mismo
        />

        <SelectOptionButton
          label="No"
          icon={<BiXCircle size={20} />}
          isSelected={field.value === false}
          isActiveColor="red"
          onClick={() => setFieldValue(name, false)} // El componente setea el valor por sí mismo
        />
      </div>

      {hasError && (
        <p className="text-xs font-medium text-red-600">{meta.error || errorMessage}</p>
      )}
    </div>
  )
}