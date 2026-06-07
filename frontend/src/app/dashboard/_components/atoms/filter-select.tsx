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
    <div className="md:w-56 md:min-w-45 flex-1 md:flex-none">
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