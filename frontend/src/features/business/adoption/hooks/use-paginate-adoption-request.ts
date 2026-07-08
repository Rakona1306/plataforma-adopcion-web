import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { adoptionService } from "../services/adoption.service";
import { useCallback, useState } from "react";
import { FilterRequestAdoptionDto } from "../dto/filter-request-adoption.dto";
import { RequestAdoptionResponse } from "../dto/request-adoption-response";
import { Paginate } from "@/core/domain/models/system/paginate";

const DEFAULT_FILTER: FilterRequestAdoptionDto = {
    page: 1,
    pageSize: 10,
};

type Props = {
    filter?: FilterRequestAdoptionDto;
    queryOptions?: Omit<
        UseQueryOptions<Paginate<RequestAdoptionResponse>, unknown, Paginate<RequestAdoptionResponse>>,
        "queryKey" | "queryFn"
    >;
};

export default function usePaginateAdoptionRequest({
    filter: initialFilter = DEFAULT_FILTER,
    queryOptions,
}: Props = {}) {
    const [filter, setFilter] = useState(initialFilter);

    const query = useQuery({
        queryKey: [QUERY_KEYS.BUSINESS.ADOPTION.REQUEST, filter],
        queryFn: () => adoptionService.paginateRequests(filter),
        ...queryOptions,
    });

    const updateFilter = useCallback((partial: Partial<FilterRequestAdoptionDto>) => {
        setFilter((prev) => ({ ...prev, ...partial }));
    }, []);

    return {
        ...query,
        filter,
        updateFilter,
    };
}