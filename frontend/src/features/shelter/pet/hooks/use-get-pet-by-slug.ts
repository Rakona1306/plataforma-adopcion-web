'use client'

import { QUERY_KEYS } from "@/shared/constants/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { petPubService } from "../services/pet-pub.service"

interface Props {
    slug: string
}

export default function useGetPetBySlug({ slug }: Props) {

    const query = useQuery({
        queryKey: [QUERY_KEYS.SHELTER.PET.PUBLIC, slug],
        queryFn: () => petPubService.getBySlug(slug)
    })

    return query;
}