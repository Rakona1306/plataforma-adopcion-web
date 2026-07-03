"use client";

import { useQuery } from "@tanstack/react-query"
import { Specie } from "../../specie/model/specie.model"
import { petPubService } from "../services/pet-pub.service"
import { QUERY_KEYS } from "@/shared/constants/queryKeys"
import { BreedPublic } from "../../breed/model/breed-pub.model";
import { TraitPublic } from "../../trait/model/trait-pub.model";

interface Props {
    specie?: Specie
    breeds?: BreedPublic[]
    traits?: TraitPublic[]
    pageSize?: number
    petId: string
}

export default function useGetPetRecommend({
    specie,
    breeds = [],
    pageSize = 15,
    traits = [],
    petId
}: Props) {

    const isEnabled = !!(specie && breeds.length > 0 && petId);

    const query = useQuery({
        queryKey: [QUERY_KEYS.SHELTER.PET, "recommend", specie?.id, breeds.map(b => b.id), petId],

        queryFn: async () => {
            return await petPubService.getRecommendations({
                specieId: specie!.id,
                breedIds: breeds.map(b => b.id),
                traitIds: traits.map(t => t.id),
                pageSize,
                petId,
            });
        },

        enabled: isEnabled,
    });

    return {
        ...query,
    }
}