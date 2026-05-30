'use client'

import { SelectField, SelectOption } from '../atoms/select-field'

interface FormSelectProps {
  label: string
  value: string | null
  options: SelectOption[]
  error?: string
  onChange: (value: string | null) => void
  placeholder?: string
}

export const FormSelect = ({
  label,
  value,
  options,
  error,
  onChange,
  placeholder,
}: FormSelectProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <SelectField
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        className='w-full'
      />

      {error && (
        <p className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}