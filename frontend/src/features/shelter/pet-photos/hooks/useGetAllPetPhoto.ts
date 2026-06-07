"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PetPhotoFilter } from "../dto/pet-photo-filter.dto";
import { petPhotosService } from "../services/pet-photos.service";


export function useGetAllPetPhoto(initialPetId?: string) {
  const router = useRouter();

  const [filter, setFilter] = useState<PetPhotoFilter>({
    page: 1,
    pageSize: 20,
    petId: initialPetId,
    isMain: undefined,
  });

  const query = useQuery({
    queryKey: ["pet-photos", filter],

    queryFn: () =>
      petPhotosService.getAll(filter),

    placeholderData: (previousData) => previousData,

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
    newFilter: Partial<PetPhotoFilter>
  ) => {
    setFilter((prev) => ({
      ...prev,
      ...newFilter,
      page: 1,
    }));
  };

  const handleClear = () => {
    updateFilter({
      petId: initialPetId,
      isMain: undefined,
    });
  };

  return {
    ...query,
    filter,
    updateFilter,
    handleClear,
  };
}