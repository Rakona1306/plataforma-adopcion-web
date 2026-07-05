'use client'

import { ChangeEvent, FocusEvent, SelectHTMLAttributes } from 'react'
import { useField } from 'formik'

export default function Select({
  label,
  helperText,
  containerClassName,
  className,
  id,
  placeholder,
  options,
  onChange,
  onBlur,
  ...props
}: SelectFormikProps) {
  const [field, meta] = useField(props.name)
  const selectId = id ?? props.name
  const hasError = Boolean(meta.touched && meta.error)
  const helperId = helperText ? `${selectId}-helper` : undefined
  const errorId = hasError ? `${selectId}-error` : undefined
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    field.onChange(event)
    onChange?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLSelectElement>) => {
    field.onBlur(event)
    onBlur?.(event)
  }

  return (
    <div className={joinClasses('flex w-full flex-col gap-2', containerClassName)}>
      <label htmlFor={selectId} className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        {...props}
        id={selectId}
        name={field.name}
        value={field.value ?? ''}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        className={joinClasses(
          'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition',
          'focus:border-slate-900 focus:ring-2 focus:ring-slate-200',
          hasError
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-200',
          className,
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}

        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

      {helperText && !hasError ? (
        <p id={helperId} className="text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}

      {hasError ? (
        <p id={errorId} className="text-xs font-medium text-red-600">
          {meta.error}
        </p>
      ) : null}
    </div>
  )
}

interface SelectFormikProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  helperText?: string
  containerClassName?: string
  placeholder?: string
  options: SelectFormikOption[]
}

export interface SelectFormikOption {
  value: string | number
  label: string
  disabled?: boolean
}

function joinClasses(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}