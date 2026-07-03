"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { BreedFilterDto } from "@/core/application/features/shelter/breeds/dtos/breed-filter-dto";
import { breedService } from "../services/breed.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useFilterPlpStore } from "@/store/use-filter-plp-store";

// Definimos los argumentos que puede recibir el hook (por ejemplo, filtros de búsqueda extra si los necesitas)
interface UseGetPaginateBreedProps {
    pageSize?: number;
    activeFeatures?: string[];
}

export default function useGetPaginateBreed({ pageSize = 10, activeFeatures = [] }: UseGetPaginateBreedProps = {}) {

    const [search, setSearch] = useState('')
    const { filters } = useFilterPlpStore()
    const [debouncedSearch] = useDebouncedValue(search, 400);

    const updateSearch = (value: string): void => {
        setSearch(value)
    }

    const isValidSearch = debouncedSearch.trim().length === 0 || debouncedSearch.trim().length >= 3;

    const query = useInfiniteQuery({

        queryKey: [QUERY_KEYS.SHELTER.BREED, "infinite", pageSize, debouncedSearch, filters, activeFeatures],

        queryFn: async ({ pageParam = 1 }) => {
            return await breedService.get({
                page: pageParam,
                pageSize: pageSize,
                search: debouncedSearch,
                storeFilters: filters,
                activeFeatures: activeFeatures
            });
        },

        enabled: isValidSearch,

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            const loadedItemsCount = lastPage.page * lastPage.pageSize;

            if (loadedItemsCount < lastPage.totalCount) {
                return lastPage.page + 1;
            }

            return undefined;
        },
    });

    return {
        ...query,
        updateSearch,
        search,
        isSearching: search !== debouncedSearch
    }
}