"use client";
import { useField } from "formik";
import { useMemo, useState } from "react";

interface Trait {
  id: string;
  name: string;
}

interface TraitsPickerProps {
  name: string;
  label?: string;
  traits: Trait[];
  isLoading?: boolean;
}

export function TraitsPicker({
  name,
  label,
  traits,
  isLoading,
}: TraitsPickerProps) {
  const [field, meta, helpers] = useField<string[]>(name);
  const [search, setSearch] = useState("");

  const selectedIds: string[] = field.value ?? [];

  const selectedItems = useMemo(
    () => traits.filter((t) => selectedIds.includes(t.id)),
    [traits, selectedIds],
  );

  const availableFiltered = useMemo(
    () =>
      traits.filter(
        (t) =>
          !selectedIds.includes(t.id) &&
          t.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [traits, selectedIds, search],
  );

  const toggle = (id: string) => {
    helpers.setTouched(true);
    helpers.setValue(
      selectedIds.includes(id)
        ? selectedIds.filter((v) => v !== id)
        : [...selectedIds, id],
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!meta.touched) helpers.setTouched(true);
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-sm font-semibold text-slate-700">{label}</label>
      )}

      {/* Buscador */}
      <div className="relative">
        <i
          className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base"
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Buscar características..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
        />
      </div>

      {/* Chips disponibles */}
      {isLoading ? (
        <p className="text-xs text-slate-400 italic">Cargando...</p>
      ) : availableFiltered.length === 0 && search ? (
        <p className="text-xs text-slate-400 italic">
          No se encontraron resultados para &quot;{search}&quot;
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {availableFiltered.map((trait) => (
            <button
              key={trait.id}
              type="button"
              onClick={() => toggle(trait.id)}
              className="px-3 py-1.5 text-sm rounded-full border border-slate-300 text-slate-500 hover:border-secondary hover:text-secondary transition"
            >
              <i className="ti ti-plus text-xs mr-1" aria-hidden="true" />
              {trait.name}
            </button>
          ))}
        </div>
      )}

      {/* Seleccionados */}
      {selectedItems.length > 0 && (
        <>
          <div className="h-px bg-slate-100" />
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Seleccionadas ({selectedItems.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((trait) => (
                <span
                  onClick={() => toggle(trait.id)}
                  key={trait.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-white border border-secondary rounded-full"
                >
                  {trait.name}
                  <button
                    type="button"
                    className="hover:text-blue-900 transition"
                    aria-label={`Eliminar ${trait.name}`}
                  >
                    <i className="ti ti-x text-xs" aria-hidden="true" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {meta.touched && meta.error && (
        <p className="text-xs text-red-600">{meta.error as string}</p>
      )}
    </div>
  );
}
