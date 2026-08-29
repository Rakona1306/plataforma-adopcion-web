export interface AdopPetResponse {
    id: string;
    name: string;
    status: string
    size: string
    gender: string
    age: number
    species: { id: string; name: string }
}