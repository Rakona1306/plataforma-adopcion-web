'use client'

import { ChangeEvent, FocusEvent, TextareaHTMLAttributes } from 'react'
import { useField } from 'formik'

export default function Textarea({
  label,
  helperText,
  containerClassName,
  className,
  id,
  rows = 5,
  onChange,
  onBlur,
  ...props
}: TextareaFormikProps) {
  const [field, meta] = useField(props.name)
  const textareaId = id ?? props.name
  const hasError = Boolean(meta.touched && meta.error)
  const helperId = helperText ? `${textareaId}-helper` : undefined
  const errorId = hasError ? `${textareaId}-error` : undefined
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(event)
    onChange?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    field.onBlur(event)
    onBlur?.(event)
  }

  return (
    <div className={joinClasses('flex w-full flex-col gap-2', containerClassName)}>
      <label htmlFor={textareaId} className="text-sm font-semibold text-slate-700 text-start">
        {label}
      </label>

      <textarea
        {...props}
        id={textareaId}
        name={field.name}
        rows={rows}
        value={field.value ?? ''}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        className={joinClasses(
          'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition resize-none',
          'placeholder:text-slate-400',
          'focus:border-slate-900 focus:ring-2 focus:ring-slate-200',
          !hasError ? 'hover:border-slate-400' : '',
          hasError
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100 ring-4 ring-red-100'
            : 'border-slate-200',
          className,
        )}
      />

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

interface TextareaFormikProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  helperText?: string
  containerClassName?: string
}

function joinClasses(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}