"use client";

import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FocusEvent,
  MouseEvent,
  ReactNode,
  forwardRef,
  memo,
  useCallback,
  useId,
  useMemo,
} from "react";

export interface DefaultInputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "size"
> {
  label?: string;
  helperText?: string;
  containerClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftIconOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  rightIconOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  leftIconAriaLabel?: string;
  rightIconAriaLabel?: string;
  error?: string;
  hasErrorActive?: boolean;
  description?: string;
}

const BASE_INPUT_CLASSES =
  "w-full rounded-xl border-2 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 disabled:bg-gray-200 disabled:text-slate-600 disabled:cursor-not-allowed placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-secondary";

const ERROR_INPUT_CLASSES =
  "border-red-400 focus:border-red-500 focus:ring-red-100 ring-4 ring-red-100 hover:border-red-500 hover:ring-red-100";

const DEFAULT_INPUT_CLASSES = "border-slate-400 hover:border-slate-700";

function joinClasses(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(" ");
}

const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  function DefaultInput(
    {
      label,
      helperText,
      containerClassName,
      className,
      id,
      name,
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
      required,
      description,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? name ?? generatedId;

    const hasError = Boolean(error) || Boolean(hasErrorActive);
    const hasLeftIcon = Boolean(leftIcon);
    const hasRightIcon = Boolean(rightIcon);

    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = hasError ? `${inputId}-error` : undefined;

    const describedBy = useMemo(
      () => [helperId, errorId].filter(Boolean).join(" ") || undefined,
      [helperId, errorId],
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
      },
      [onChange],
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
      },
      [onBlur],
    );

    const inputClassName = useMemo(
      () =>
        joinClasses(
          BASE_INPUT_CLASSES,
          hasLeftIcon && "pl-11",
          hasRightIcon && "pr-11",
          hasError ? ERROR_INPUT_CLASSES : DEFAULT_INPUT_CLASSES,
          className,
        ),
      [hasLeftIcon, hasRightIcon, hasError, className],
    );

    return (
      <div
        className={joinClasses(
          "flex w-full flex-col gap-2",
          containerClassName,
        )}
      >
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-slate-700 text-start"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        ) : null}

        {description ? (
          <p className="text-sm text-gray-500">{description}</p>
        ) : null}

        <div className="relative">
          {hasLeftIcon ? (
            <IconSlot
              position="left"
              icon={leftIcon}
              onClick={leftIconOnClick}
              ariaLabel={leftIconAriaLabel}
            />
          ) : null}

          <input
            {...props}
            ref={ref}
            id={inputId}
            name={name}
            required={required}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : describedBy}
            className={inputClassName}
          />

          {hasRightIcon ? (
            <IconSlot
              position="right"
              icon={rightIcon}
              onClick={rightIconOnClick}
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
          <p
            id={errorId}
            role="alert"
            aria-describedby={describedBy}
            className="text-xs font-medium text-red-600"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

DefaultInput.displayName = "DefaultInput";

export default memo(DefaultInput);

interface IconSlotProps {
  position: "left" | "right";
  icon: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
}

const IconSlot = memo(function IconSlot({
  position,
  icon,
  onClick,
  ariaLabel,
}: IconSlotProps) {
  const positionClassName = position === "left" ? "left-3" : "right-3";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? `input-${position}-icon`}
        className={joinClasses(
          "absolute inset-y-0 z-10 flex items-center text-slate-400 transition hover:text-slate-600",
          positionClassName,
        )}
      >
        {icon}
      </button>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={joinClasses(
        "pointer-events-none absolute inset-y-0 flex items-center text-slate-400",
        positionClassName,
      )}
    >
      {icon}
    </span>
  );
});

IconSlot.displayName = "IconSlot";
