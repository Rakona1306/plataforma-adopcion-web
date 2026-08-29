import { useQuery } from "@tanstack/react-query";
import { RequestAdoptionFilter } from "../../dto/dashboard/request-adoption-filter";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { requestAdoptionService } from "../../services/request-adoption.service";
import { useCallback, useState } from "react";

interface Props extends Partial<RequestAdoptionFilter> {

}

export default function usePaginateRequestAdoption(props: Props = { page: 1, pageSize: 10 }) {

    const [filter, setFilter] = useState<RequestAdoptionFilter>(props as RequestAdoptionFilter);

    const query = useQuery({
        queryKey: [QUERY_KEYS.BUSINESS.REQUEST_ADOPTION.PAGINATE],
        queryFn: () => requestAdoptionService.paginate(filter)
    })

    const updateFilter = useCallback((partial: Partial<RequestAdoptionFilter>) => {
        setFilter((prev) => ({ ...prev, ...partial }));
    }, []);

    return {
        ...query,
        filter,
        updateFilter
    }
}