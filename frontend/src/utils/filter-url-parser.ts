// utils/filter-url-parser.ts


import { FEATURE_FILTER } from "@/shared/constants/feature_filter";
import { FilterItem } from "@/store/use-filter-plp-store/interfaces/filter-item.interface";

export function appendFeatureFiltersToParams(
    params: URLSearchParams,
    activeFeatureValues: string[],
    storeFilters: FilterItem[]
): void {
    const featuresToProcess = Object.values(FEATURE_FILTER).filter(feature => {
        return activeFeatureValues.length === 0 || activeFeatureValues.includes(feature.VALUE);
    });

    featuresToProcess.forEach(feature => {
        const matchingFilters = storeFilters.filter((f: any) => f.feature === feature.VALUE);
        if (matchingFilters.length === 0) return;

        // 🚀 CASO ESPECIAL: Si es el Feature AGE, inyectamos minAge y maxAge por separado
        if (feature.VALUE === FEATURE_FILTER.AGE.VALUE) {
            matchingFilters.forEach((f: any) => {
                if (f.id !== undefined && f.id !== null && f.id !== "") {
                    // f.name contiene 'minAge' o 'maxAge' gracias a la configuración del RangeSlider
                    params.append(f.name, f.id);
                }
            });
            return;
        }

        // 🚀 CASO ESTÁNDAR: Agrupación por comas (gender, specieId, size, breedId)
        const idsJoined = matchingFilters
            .map((f: any) => f.id)
            .filter(id => id !== undefined && id !== null && id !== "")
            .join(",");

        if (idsJoined) {
            params.append(feature.ID, idsJoined);
        }
    });
}