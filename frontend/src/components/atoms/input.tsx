'use client'

import { ChangeEvent, FocusEvent, InputHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { useField } from 'formik'

export default function Input({
  label,
  helperText,
  containerClassName,
  className,
  id,
  leftIcon,
  rightIcon,
  leftIconOnClick,
  rightIconOnClick,
  leftIconAriaLabel,
  rightIconAriaLabel,
  onChange,
  onBlur,
  error,
  hasErrorActive,
  ...props
}: InputFormikProps) {
  const [field, meta] = useField(props.name)
  const inputId = id ?? props.name
  const hasError = Boolean(meta.touched && meta.error) || error || hasErrorActive
  const helperId = helperText ? `${inputId}-helper` : undefined
  const errorId = hasError ? `${inputId}-error` : undefined
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined
  const hasLeftIcon = Boolean(leftIcon)
  const hasRightIcon = Boolean(rightIcon)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    field.onChange(event)
    onChange?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    field.onBlur(event)
    onBlur?.(event)
  }

  const handleLeftIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    leftIconOnClick?.(event)
  }

  const handleRightIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    rightIconOnClick?.(event)
  }

  return (
    <div className={joinClasses('flex w-full flex-col gap-2', containerClassName)}>
      <label htmlFor={inputId} className="text-sm font-semibold text-slate-700 text-start">
        {label}
      </label>

      <div className="relative">
        {hasLeftIcon ? (
          <IconSlot
            position="left"
            icon={leftIcon}
            onClick={leftIconOnClick ? handleLeftIconClick : undefined}
            ariaLabel={leftIconAriaLabel}
          />
        ) : null}

        <input
          {...props}
          id={inputId}
          name={field.name}
          value={field.value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={describedBy}
          className={joinClasses(
            'w-full rounded-xl border-2 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 disabled:bg-gray-200 disabled:text-slate-600 disabled:cursor-not-allowed',
            'placeholder:text-slate-400',
            'focus:border-primary focus:ring-4 focus:ring-secondary',
            !hasError ? 'hover:border-slate-700' : '',
            hasLeftIcon ? 'pl-11' : undefined,
            hasRightIcon ? 'pr-11' : undefined,
            hasError
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100 ring-4 ring-red-100 hover:border-red-500 hover:ring-red-100'
              : 'border-slate-400',
            className,
          )}
        />

        {hasRightIcon ? (
          <IconSlot
            position="right"
            icon={rightIcon}
            onClick={rightIconOnClick ? handleRightIconClick : undefined}
            ariaLabel={rightIconAriaLabel}
          />
        ) : null}
      </div>

      {helperText && !hasError ? (
        <p id={helperId} className="text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}

      {hasError ? (
        <p id={errorId} className="text-xs font-medium text-red-600">
          {meta.error || error}
        </p>
      ) : null}
    </div>
  )
}

interface InputFormikProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  helperText?: string
  containerClassName?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  leftIconOnClick?: (event: MouseEvent<HTMLButtonElement>) => void
  rightIconOnClick?: (event: MouseEvent<HTMLButtonElement>) => void
  leftIconAriaLabel?: string
  rightIconAriaLabel?: string
  error?: string
  hasErrorActive?: boolean
}

function joinClasses(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

interface IconSlotProps {
  position: 'left' | 'right'
  icon: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  ariaLabel?: string
}

function IconSlot({ position, icon, onClick, ariaLabel }: IconSlotProps) {
  const positionClassName = position === 'left' ? 'left-3' : 'right-3'

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? `input-${position}-icon`}
        className={joinClasses(
          'absolute inset-y-0 z-10 flex items-center text-slate-400 transition hover:text-slate-600',
          positionClassName,
        )}
      >
        {icon}
      </button>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={joinClasses(
        'pointer-events-none absolute inset-y-0 flex items-center text-slate-400',
        positionClassName,
      )}
    >
      {icon}
    </span>
  )
}
