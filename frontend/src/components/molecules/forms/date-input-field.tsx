"use client";

import { DateInputBase } from "@/components/atoms/forms/date-input-base";
import { BaseDateInputProps } from "@/shared/types/components/date-type";
import { DateValue } from "@mantine/dates";
import { forwardRef, type ReactNode } from "react";

export interface DateInputFieldProps extends BaseDateInputProps {
    value: DateValue;
    onChange: (value: DateValue) => void;
    error?: ReactNode;
}

export const DateInputField = forwardRef<HTMLInputElement, DateInputFieldProps>(
    ({ value, onChange, error, ...rest }, ref) => {
        return (
            <DateInputBase
                ref={ref}
                value={value}
                onChange={onChange}
                error={error}
                {...rest}
            />
        );
    }
);

DateInputField.displayName = "DateInputField";