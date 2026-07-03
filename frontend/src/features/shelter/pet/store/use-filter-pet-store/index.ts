import { create } from "zustand";
import { FEATURE_FILTER } from "@/shared/constants/feature_filter";
import { useFilterPlpStore } from "@/store/use-filter-plp-store";
import { ConfirmedPetFilters } from "./interfaces/confirmed-pet-filters";
import { FilterPetStore } from "./interfaces/filter-pet-store";

const initialConfirmedFilters: ConfirmedPetFilters = {
    gender: [],
    specieId: [],
    size: [],
    breedId: [],
    minAge: null,
    maxAge: null,
};

export const useFilterPetStore = create<FilterPetStore>((set) => ({
    confirmedFilters: initialConfirmedFilters,

    confirmFilters: () => {

        const currentFilters = useFilterPlpStore.getState().filters;
        const AGE_CONFIG = FEATURE_FILTER.AGE;

        // Extraemos de manera directa e inmutable los rangos de edad numéricos
        const minAgeFilter = currentFilters.find(f => f.feature === AGE_CONFIG.VALUE && f.name === AGE_CONFIG.MIN_ID);
        const maxAgeFilter = currentFilters.find(f => f.feature === AGE_CONFIG.VALUE && f.name === AGE_CONFIG.MAX_ID);

        // Mapeamos el resto de arrays planos filtrando por su respectivo VALUE de feature
        const confirmed: ConfirmedPetFilters = {
            gender: currentFilters.filter(f => f.feature === FEATURE_FILTER.GENDER.VALUE).map(f => f.id),
            specieId: currentFilters.filter(f => f.feature === FEATURE_FILTER.SPECIE.VALUE).map(f => f.id),
            size: currentFilters.filter(f => f.feature === FEATURE_FILTER.SIZE.VALUE).map(f => f.id),
            breedId: currentFilters.filter(f => f.feature === FEATURE_FILTER.BREED.VALUE).map(f => f.id),
            minAge: minAgeFilter ? parseInt(minAgeFilter.id, 10) : null,
            maxAge: maxAgeFilter ? parseInt(maxAgeFilter.id, 10) : null,
        };

        set({ confirmedFilters: confirmed });
    },

    resetConfirmedFilters: () => set({ confirmedFilters: initialConfirmedFilters }),
}));