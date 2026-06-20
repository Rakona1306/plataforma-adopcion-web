"use client";

import { forwardRef, type ReactNode } from "react";
import { DateInput, DateValue } from "@mantine/dates";
import { BaseDateInputProps } from "@/shared/types/components/date-type";

export interface DateInputBaseProps extends BaseDateInputProps {
    value: DateValue;
    onChange: (value: DateValue) => void;
    error?: ReactNode;
}

export const DateInputBase = forwardRef<HTMLInputElement, DateInputBaseProps>(
    (
        {
            value,
            onChange,
            error,
            valueFormat = "DD/MM/YYYY",
            placeholder = "Selecciona una fecha",
            clearable = true,
            ...rest
        },
        ref
    ) => {
        return (
            <DateInput
                ref={ref}
                value={value}
                onChange={onChange}
                error={error}
                valueFormat={valueFormat}
                placeholder={placeholder}
                clearable={clearable}
                {...rest}
            />
        );
    }
);

DateInputBase.displayName = "DateInputBase";