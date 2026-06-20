// components/atoms/traits-picker.tsx
"use client";
import { useField } from "formik";
import { useMemo, useState, useEffect } from "react";

interface Trait {
  id: string;
  name: string;
  createdAt?: Date;
}

interface DiffValue {
  addIds: string[];
  removeIds: string[];
}

interface TraitsPickerProps {
  name: string;
  label?: string;
  traits: Trait[];
  isLoading?: boolean;
  /** Traits que ya tiene la mascota al abrir el formulario */
  defaultItems?: Trait[];
}

export function TraitsPicker({
  name,
  label,
  traits,
  isLoading,
  defaultItems = [],
}: TraitsPickerProps) {
  const [, meta, helpers] = useField<DiffValue>(name);
  const [search, setSearch] = useState("");

  // IDs originales (snapshot al montar, no cambia)
  const defaultIds = useMemo(
    () => defaultItems.map((t) => t.id),
    // Solo calculamos una vez al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Estado local: IDs actualmente seleccionados en la UI
  const [currentIds, setCurrentIds] = useState<string[]>(defaultIds);

  // Sincronizar diff → Formik cada vez que currentIds cambia
  useEffect(() => {
    const addIds = currentIds.filter((id) => !defaultIds.includes(id));
    const removeIds = defaultIds.filter((id) => !currentIds.includes(id));
    helpers.setValue({ addIds, removeIds });
    // helpers no es estable entre renders, ignorarlo en deps es intencional
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIds]);

  // Pool completo para resolver nombres: traits del server + defaultItems
  const allKnown = useMemo(() => {
    const map = new Map<string, Trait>();
    defaultItems.forEach((t) => map.set(t.id, t));
    traits.forEach((t) => map.set(t.id, t));
    return map;
  }, [defaultItems, traits]);

  // Items visualmente seleccionados
  const selectedItems = useMemo(
    () => currentIds.map((id) => allKnown.get(id)).filter(Boolean) as Trait[],
    [currentIds, allKnown],
  );

  // Items disponibles para agregar (no seleccionados y que pasan el filtro)
  const availableFiltered = useMemo(
    () =>
      traits.filter(
        (t) =>
          !currentIds.includes(t.id) &&
          t.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [traits, currentIds, search],
  );

  const add = (id: string) => {
    helpers.setTouched(true);
    setCurrentIds((prev) => [...prev, id]);
  };

  const remove = (id: string) => {
    helpers.setTouched(true);
    setCurrentIds((prev) => prev.filter((v) => v !== id));
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
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar características..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
        />
      </div>

      {/* Chips disponibles para agregar */}
      {isLoading ? (
        <p className="text-xs text-slate-400 italic">Cargando...</p>
      ) : availableFiltered.length === 0 && search ? (
        <p className="text-xs text-slate-400 italic">
          No se encontraron resultados para &quot;{search}&quot;
        </p>
      ) : availableFiltered.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {availableFiltered.map((trait) => (
            <button
              key={trait.id}
              type="button"
              onClick={() => add(trait.id)}
              className="px-3 py-1.5 text-sm rounded-full border border-slate-300 text-slate-500 hover:border-secondary hover:text-secondary transition"
            >
              <i className="ti ti-plus text-xs mr-1" aria-hidden="true" />
              {trait.name}
            </button>
          ))}
        </div>
      ) : null}

      {/* Seleccionados */}
      {selectedItems.length > 0 && (
        <>
          <div className="h-px bg-slate-100" />
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Seleccionadas ({selectedItems.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((trait) => {
                const isNew = !defaultIds.includes(trait.id);
                return (
                  <span
                    key={trait.id}
                    onClick={() => remove(trait.id)}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full
                      cursor-pointer transition-opacity hover:opacity-75
                      ${isNew
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-primary text-white border border-secondary"
                      }
                    `}
                  >
                    {trait.name}
                    <button
                      type="button"
                      className="transition"
                      aria-label={`Eliminar ${trait.name}`}
                    >
                      <i className="ti ti-x text-xs" aria-hidden="true" />
                    </button>
                  </span>
                );
              })}
            </div>
            {/* Leyenda si hay cambios */}
            {(selectedItems.some((t) => !defaultIds.includes(t.id)) ||
              defaultIds.some((id) => !currentIds.includes(id))) && (
                <p className="text-xs text-slate-400 mt-0.5">
                  <span className="text-green-600 font-medium">Verde</span> = nuevo ·{" "}
                  <span className="font-medium" style={{ color: "var(--color-primary)" }}>
                    Color primario
                  </span>{" "}
                  = existente
                </p>
              )}
          </div>
        </>
      )}

      {meta.touched && meta.error && (
        <p className="text-xs text-red-600">{meta.error as string}</p>
      )}
    </div>
  );
}