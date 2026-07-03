export interface ConfirmedPetFilters {
    gender: string[];
    specieId: string[];
    size: string[];
    breedId: string[];
    minAge: number | null;
    maxAge: number | null;
}