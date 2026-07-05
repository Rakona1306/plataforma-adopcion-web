import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { adoptionService } from "../services/adoption.service";
import { useCallback, useState } from "react";
import { FilterRequestAdoptionDto } from "../dto/filter-request-adoption.dto";

interface Props {
    page: number
    pageSize: number
}

const DEFAULT_FILTER: Props = {
    page: 1,
    pageSize: 10
}

export default function usePaginateAdoptionRequest(props: Props = DEFAULT_FILTER) {
    const [filter, setFilter] = useState<Props>(props);

    const query = useQuery({
        queryKey: [QUERY_KEYS.BUSINESS.ADOPTION.REQUEST],
        queryFn: () => adoptionService.paginateRequests(filter!)
    })

    const updateFilter = useCallback((partial: Partial<FilterRequestAdoptionDto>) => {
        setFilter((prev) => ({ ...prev, ...partial }));
    }, []);

    return {
        ...query,
        updateFilter,
        filter
    }
}