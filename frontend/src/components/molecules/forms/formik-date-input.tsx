"use client";

import { forwardRef } from "react";
import { useField } from "formik";
import { BaseDateInputProps } from "@/shared/types/components/date-type";
import { DateInputBase } from "@/components/atoms/forms/date-input-base";
import { DateValue } from "@mantine/dates";

export interface FormikDateInputFieldProps extends BaseDateInputProps {
    name: string;
    error?: string
}

export const FormikDateInputField = forwardRef<
    HTMLInputElement,
    FormikDateInputFieldProps
>(({ name, error, ...rest }, ref) => {
    const [field, meta, helpers] = useField<DateValue>(name);

    const showError = meta.touched && Boolean(meta.error) || error;

    return (
        <DateInputBase
            ref={ref}
            value={field.value ?? null}
            onChange={(value) => {
                helpers.setValue(value);
                helpers.setTouched(true, false);
            }}
            onBlur={field.onBlur}
            error={showError ? meta.error || error : undefined}
            name={name}
            {...rest}
        />
    );
});

FormikDateInputField.displayName = "FormikDateInputField";