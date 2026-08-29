'use client'

import { SelectField, SelectOption } from '../atoms/select-field'

interface FormSelectProps {
  label: string
  value: string | null
  options: SelectOption[]
  error?: string
  onChange: (value: string | null) => void
  onTouch: () => void
  placeholder?: string
  required?: boolean
}

export const FormSelect = ({
  label,
  value,
  options,
  error,
  onChange,
  onTouch,
  placeholder,
  required
}: FormSelectProps) => {
  return (
    <div className="flex flex-col gap-2 w-full" onClick={onTouch}>
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <SelectField
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onTouch}
        className="w-full"
      />

      {error && (
        <p className="text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  )
}