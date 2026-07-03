import { ConfirmedPetFilters } from "./confirmed-pet-filters";

export interface FilterPetStore {
    confirmedFilters: ConfirmedPetFilters;
    confirmFilters: () => void;
    resetConfirmedFilters: () => void;
}