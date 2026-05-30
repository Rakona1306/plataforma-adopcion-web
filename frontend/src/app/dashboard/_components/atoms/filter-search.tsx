// src/components/atoms/filter-search.tsx
import { TextInput } from "@mantine/core";
import { BiSearch } from "react-icons/bi";

interface FilterSearchProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSearch({ label, placeholder, value, onChange }: FilterSearchProps) {
  return (
    <div className="flex-1">
      <TextInput
        label={label}
        placeholder={placeholder || "Buscar..."}
        leftSection={<BiSearch size={16} />}
        value={value}
        className="w-full"
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}