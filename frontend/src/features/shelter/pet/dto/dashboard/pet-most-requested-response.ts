export interface SpecieItem {
    id: string;
    name: string;
}

export interface PetPhotoItem {
    id: string;
    url: string;
    isMain: boolean;
}

export interface PetMostRequestedResponse {
    id: string;
    name: string;
    description: string | null;
    rescueStory: string | null;
    birthDate: string | null;
    weightKg: number | null;
    slug: string | null;
    isVaccinated: boolean;
    isRecommend: boolean | null;
    isSterilized: boolean;
    isAdopted: boolean;
    age: number;
    gender: string;
    size: string;
    status: string;

    species: SpecieItem;
    photos: PetPhotoItem[];

    requestCount: number;
}