// src/components/organisms/filter-bar.tsx
import FilterSearch from "../atoms/filter-search";
import FilterSelect from "../atoms/filter-select";
import FilterDate from "../atoms/filter-date";
import { FilterItemConfig } from "../../_interfaces/ui/filters";
import { BiTrash } from "react-icons/bi";

interface FilterBarProps {
  filters: FilterItemConfig[];
  onClearAll?: () => void; // Callback opcional para resetear los useStates externos
}

export default function FilterBar({ filters, onClearAll }: FilterBarProps) {
  return (
    <div className="w-full bg-white border shadow border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex flex-wrap items-end gap-4">

        {filters.map((filter, index) => {
          switch (filter.type) {
            case "search":
              return (
                <FilterSearch
                  key={`search-${index}`}
                  label={filter.label}
                  placeholder={filter.placeholder}
                  value={filter.value ?? ""}
                  onChange={filter.onChange}
                />
              );

            case "select":
              return (
                <FilterSelect
                  key={`select-${index}`}
                  label={filter.label}
                  placeholder={filter.placeholder}
                  options={filter.options}
                  value={filter.value}
                  onChange={filter.onChange}
                />
              );

            case "date":
              return (
                <FilterDate
                  key={`date-${index}`}
                  label={filter.label}
                  placeholder={filter.placeholder}
                  value={filter.value}
                  onChange={filter.onChange}
                />
              );

            default:
              return null;
          }
        })}

        {/* Botón para limpiar todos los estados en el padre */}
        {onClearAll && (
          <button
            onClick={onClearAll}
            type="button"
            className="py-3 px-3 text-xs flex gap-2 items-center font-bold! text-white hover:bg-red-700 transition-colors rounded-lg bg-red-600 shadow-sm cursor-pointer"
          >
            <BiTrash size={19} />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}