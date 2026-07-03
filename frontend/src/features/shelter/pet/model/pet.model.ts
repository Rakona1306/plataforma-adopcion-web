import { PetGenders } from "@/features/system/enums/pet-genders/model/pet-genders.model";
import { PetSizes } from "@/features/system/enums/pet-sizes/model/pet-sizes.model";
import { PetStatus } from "@/features/system/enums/pet-status/model/pet-status.model";
import { Breed } from "../../breed/model/breed.model";
import { Trait } from "../../trait/model/trait.model";
import { VaccineRelation } from "../../vaccine/model/vaccine-relation.model";
import { PetPhotoResponse } from "../../pet-photos/dto/pet-photo-response";

export interface Pet {
    id: string;
    name: string;
    description: string;
    rescueStory: string;
    birthDate: Date;
    weightKg: number;
    isSterilized: boolean;
    gender: PetGenders;
    size: PetSizes;
    status: PetStatus;
    speciesName: string;
    isVaccinated: boolean;
    speciesId: string;
    createdAt: Date;
    age: number;
    isAdopted: boolean;

    breeds: Breed[]
    traits: Trait[]
    vaccines: VaccineRelation[]

    photoUrls: PetPhotoResponse[];
}
