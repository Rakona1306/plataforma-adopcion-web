import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { speciePublicService } from "../services/specie-public.service";

export default function useGetAllSpecie() {
    const query = useQuery({
        queryKey: [QUERY_KEYS.SHELTER.SPECIE.PUBLIC],
        queryFn: () => speciePublicService.getAll(),
        refetchOnWindowFocus: false
    })

    return query
}