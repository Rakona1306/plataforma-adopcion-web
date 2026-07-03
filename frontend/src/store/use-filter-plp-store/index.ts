import { create } from "zustand";
import { FilterItem } from "./interfaces/filter-item.interface";

interface FilterPlpStore {
    filters: FilterItem[];
    setFilter: (filter: FilterItem) => void;
    removeFilter: (filter: FilterItem) => void;
    searchFilter: (name: string, id: string) => FilterItem | null;
    returnArrayString: (feature: string) => string[];
    cleanFilters: () => void
}

export const useFilterPlpStore = create<FilterPlpStore>((set, get) => ({
    filters: [],

    setFilter: (filter: FilterItem) => {
        // 💡 Usamos `get()` para leer el estado actual sin mutar ni disparar un set innecesario
        const filterSearched = get().searchFilter(filter.name, filter.id);

        if (!filterSearched) {
            set((state) => ({
                // 🚀 Retornamos un NUEVO objeto con el array clonado. ¡Reactividad inmediata!
                filters: [...state.filters, filter],
            }));
        }
    },

    removeFilter: (filter: FilterItem) => {
        const filterSearched = get().searchFilter(filter.name, filter.id);

        if (filterSearched) {
            set((state) => ({
                // 🚀 .filter() ya devuelve un array totalmente nuevo, rompiendo la referencia vieja
                filters: state.filters.filter(
                    (item) => item.uid !== filter.uid && item.name !== filter.name
                ),
            }));
        }
    },

    // 💡 Las funciones de lectura NO llevan `set`. Son funciones puras que leen de `get()`
    searchFilter: (name: string, id: string) => {
        const currentFilters = get().filters;
        return currentFilters.find((item) => item.name === name && item.id === id) || null;
    },

    returnArrayString: (feature: string) => {
        const currentFilters = get().filters;
        // 🚀 Cambiado a un .filter().map() mucho más declarativo y rápido
        return currentFilters
            .filter((item) => item.feature === feature)
            .map((item) => item.id);
    },

    cleanFilters: () => {
        set({ filters: [] })
    }
}));