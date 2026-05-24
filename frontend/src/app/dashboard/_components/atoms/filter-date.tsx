// src/components/atoms/filter-date.tsx
import { DateInput } from "@mantine/dates";

interface FilterDateProps {
  label: string;
  placeholder?: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function FilterDate({ label, placeholder, value, onChange }: FilterDateProps) {
  return (
    <div className="w-52 min-w-40">
      <DateInput
        label={label}
        placeholder={placeholder || "Elija una fecha"}
        value={value}
        onChange={onChange}
        clearable
        valueFormat="DD/MM/YYYY"
      />
    </div>
  );
}