// src/components/organisms/filter-bar.tsx
import FilterSearch from "../atoms/filter-search";
import FilterSelect from "../atoms/filter-select";
import FilterDate from "../atoms/filter-date";
import { FilterItemConfig } from "../../_interfaces/ui/filters";
import { BiTrash } from "react-icons/bi";
import { SearchSelectComp } from "@/components/organisms/search-select-comp";

interface FilterBarProps {
  filters: FilterItemConfig[];
  onClearAll?: () => void; // Callback opcional para resetear los useStates externos
}

export default function FilterBar({ filters, onClearAll }: FilterBarProps) {
  return (
    <div className="w-full bg-white border shadow border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex flex-wrap md:items-end gap-4 w-full md:flex-row flex-col">

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
            case "select-search":
              return (
                <SearchSelectComp
                  key={`select-search-${index}`}
                  label={filter.label}
                  placeholder={filter.placeholder}
                  filterValue={filter.value ?? ""}
                  options={filter.options}
                  displayField={filter.displayField}
                  valueField={filter.valueField}
                  onChange={filter.onChange}
                  className="flex-1"
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