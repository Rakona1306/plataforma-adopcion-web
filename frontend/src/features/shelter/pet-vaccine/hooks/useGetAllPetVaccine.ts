'use client';

import { useState } from "react";
import { PetVaccineFilterDto } from "../dto/pet-vaccine-filter.dto";
import { useQuery } from "@tanstack/react-query";
import { petVaccineService } from "../services/pet-vaccine.service";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

interface Props {
    page?: number
    pageSize?: number
    petId?: string
}

export function useGetAllPetVaccine({ page, pageSize, petId }: Props) {

    const router = useRouter();
    const [filter, setFilter] = useState<PetVaccineFilterDto>({
        page: page ?? 1,
        pageSize: pageSize ?? 10,
        petId: petId ?? ''
    });

    const query = useQuery({
        queryKey: [QUERY_KEYS.SHELTER.PET_VACCINE, filter.page, filter.petId, filter.pageSize],

        queryFn: () => petVaccineService.getAll(filter),

        placeholderData: (previousData) => previousData,

        refetchOnWindowFocus: false,

        throwOnError: (error: any) => {
            if (
                error?.response?.status === 401 ||
                error?.status === 401
            ) {
                router.push("/login");
                return false;
            }

            return true;
        },
    });

    const updateFilter = (
        newFilter: Partial<PetVaccineFilterDto>
    ) => {
        setFilter((prev) => ({
            ...prev,
            ...newFilter,
            page: 1,
        }));
    };

    const handleClear = () => {
        updateFilter({
            petId: "",
        });
    };

    return {
        ...query,
        filter,
        updateFilter,
        handleClear,
    };
}