// src/components/organisms/multi-select.tsx
'use client'

import { useField, useFormikContext } from 'formik'
import { SelectOptionChip } from '../atoms/select-option-chip'

interface Option { label: string; value: string | number; }

export default function MultiSelect({ name, label, options }: { name: string, label: string, options: Option[] }) {
  const [field, meta] = useField<Array<string | number>>(name)
  const { setFieldValue } = useFormikContext()
  const values = field.value || []

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
          {values.length} seleccionados
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 py-1">
        {options.map((opt) => (
          <SelectOptionChip
            key={opt.value}
            label={opt.label}
            isSelected={values.includes(opt.value)}
            onClick={() => {
              const newValue = values.includes(opt.value)
                ? values.filter((v) => v !== opt.value)
                : [...values, opt.value];
              setFieldValue(name, newValue);
            }}
          />
        ))}
      </div>

      {meta.touched && meta.error && (
        <p className="text-[11px] text-red-500 font-medium pl-1">{meta.error as string}</p>
      )}
    </div>
  )
}