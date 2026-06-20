import type { DateInputProps as MantineDateInputProps } from "@mantine/dates";

export type BaseDateInputProps = Omit<
    MantineDateInputProps,
    "value" | "onChange" | "error"
>;

export type DateValue = Date | null;