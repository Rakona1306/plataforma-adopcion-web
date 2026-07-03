import { PetGenders } from "@/features/system/enums/pet-genders/model/pet-genders.model";
import { PetSizes } from "@/features/system/enums/pet-sizes/model/pet-sizes.model";
import { PetStatus } from "@/features/system/enums/pet-status/model/pet-status.model";
import { BreedPublic } from "../../breed/model/breed-pub.model";
import { TraitPublic } from "../../trait/model/trait-pub.model";
import { VaccinePubRelation } from "../../vaccine/model/vaccine-pub-relation.model";
import { PetPhotoPubRelation } from "../../pet-photos/model/pet-photo-pub-relation.model";
import { SpeciePub } from "../../specie/model/specie-pub.model";

export interface PetPublic {
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
    isVaccinated: boolean;
    speciesId: string;
    age: number;
    isAdopted: boolean;
    slug: string;

    breeds: BreedPublic[]
    traits: TraitPublic[]
    vaccines: VaccinePubRelation[]
    specie: SpeciePub

    photoUrls: PetPhotoPubRelation[];
}