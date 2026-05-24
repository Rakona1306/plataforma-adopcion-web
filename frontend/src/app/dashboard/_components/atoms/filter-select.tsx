// src/components/atoms/filter-select.tsx
import { Select } from "@mantine/core";

interface FilterSelectProps {
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function FilterSelect({ label, placeholder, options, value, onChange }: FilterSelectProps) {
  return (
    <div className="w-56 min-w-45">
      <Select
        label={label}
        placeholder={placeholder || "Seleccionar..."}
        data={options}
        value={value}
        onChange={onChange}
        clearable
      />
    </div>
  );
}