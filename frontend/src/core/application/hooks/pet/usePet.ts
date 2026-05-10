"use client"

import { petsData } from "@/app/(web)/_utils/data/pets.data"

export const usePet = (petId: number) => {
  const pet = petsData.find((p) => p.id === petId)

  return {
    pet
  }
}