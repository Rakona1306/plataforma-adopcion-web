import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { petPubService } from "../services/pet-pub.service";
import { useCallback, useDeferredValue, useState } from "react";
import { PetPubFilterDto } from "../dto/pet-pub-filter.dto";
import { useFilterPetStore } from "../store/use-filter-pet-store";

const DEFAULT_FILTER: PetPubFilterDto = {
    page: 1,
    sort: "",
    pageSize: 20,
    search: "",
};

const SEARCH_MIN_CHARS = 3;

export function useGetPaginateSearch() {

    const [filter, setFilter] = useState<PetPubFilterDto>(DEFAULT_FILTER)
    const deferredSearch = useDeferredValue(filter.search ?? '');
    const { confirmedFilters } = useFilterPetStore()

    const effectiveSearch = deferredSearch.length >= SEARCH_MIN_CHARS ? deferredSearch : "";

    const queryKey = [
        QUERY_KEYS.SHELTER.PET.PUBLIC,
        confirmedFilters,
        {
            page: filter.page,
            sort: filter.sort,
            pageSize: filter.pageSize,
            search: effectiveSearch,
        },
    ] as const;

    const query = useQuery({
        queryKey,
        queryFn: () => petPubService.getPaginateSearch(filter, confirmedFilters),
        staleTime: 1000 * 60 * 5,
        placeholderData: (prev) => prev,
    })

    const updateFilter = useCallback((partial: Partial<PetPubFilterDto>) => {
        setFilter((prev) => ({ ...prev, ...partial }));
    }, []);

    const setSearch = useCallback((search: string) => {
        setFilter((prev) => ({ ...prev, search, page: 1 }));
    }, []);

    const setPage = useCallback((page: number) => {
        setFilter((prev) => ({ ...prev, page }));
    }, []);

    const isSearchPending = filter.search !== deferredSearch;
    const isSearchActive = filter.search.length >= SEARCH_MIN_CHARS;

    return {
        ...query,
        updateFilter,
        filter,
        setSearch,
        setPage,
        isSearchPending,
        isSearchActive
    }
}