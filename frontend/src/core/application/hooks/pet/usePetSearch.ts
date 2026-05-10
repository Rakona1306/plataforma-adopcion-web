"use client"

import { petsData } from "@/app/(web)/_utils/data/pets.data"
import { Pet } from "@/domain/models/Pet"
import { useMemo, useState } from "react"

export const usePetSearch = (): UsePetSearchReturn => {

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRace, setSelectedRace] = useState<string>('todos')
  const [selectedGender, setSelectedGender] = useState<string>('todos')

  // Filter pets based on search and filters
  const filteredPets = useMemo(() => {
    return petsData.filter((pet) => {
      const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.characteristics.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesRace = selectedRace === 'todos' || pet.race.name === selectedRace
      const matchesGender = selectedGender === 'todos' || pet.gender === selectedGender

      return matchesSearch && matchesRace && matchesGender
    })
  }, [searchTerm, selectedRace, selectedGender])

  const races = ['Perro', 'Gato']
  const genders = ['Macho', 'Hembra']

  const hasActiveFilters = searchTerm || selectedRace !== 'todos' || selectedGender !== 'todos'

  return {
    searchTerm,
    setSearchTerm,
    races,
    genders,
    selectedRace,
    setSelectedRace,
    selectedGender,
    setSelectedGender,
    hasActiveFilters,
    filteredPets
  }
}

interface UsePetSearchReturn {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  
  filteredPets: Pet[]
  races: string[]
  genders: string[]
  hasActiveFilters: string | boolean

  selectedRace: string
  setSelectedRace: React.Dispatch<React.SetStateAction<string>>

  selectedGender: string
  setSelectedGender: React.Dispatch<React.SetStateAction<string>>
}