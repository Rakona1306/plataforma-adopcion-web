"use client"

import { PetCardItem } from "@/app/(web)/_components/atoms/card/pet-card-item"
import { petsData } from "@/app/(web)/_utils/data/pets.data"
import Container from "@/components/atoms/container"
import { usePetSearch } from "@/core/application/hooks/pet/usePetSearch"
import { BiSearch, BiX } from "react-icons/bi"

export default function PetListPage () {

  const { 
    searchTerm, 
    setSearchTerm, 
    selectedRace, 
    setSelectedRace, 
    selectedGender, 
    setSelectedGender, 
    filteredPets,
    races,
    genders,
    hasActiveFilters
   } = usePetSearch()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-primary/5 py-12 md:py-16">
      <Container className=" space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
            Conoce a Nuestras <span className="text-primary">Mascotas</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Encuentra tu compañero perfecto. Cada mascota merece un hogar lleno de amor.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-800" />
            <input
              type="text"
              placeholder="Busca por nombre, raza o características..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-4 rounded-full border-2 border-primary/20 focus:border-primary outline-none transition-colors text-base md:text-lg"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Race Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">Tipo de Mascota</label>
              <select
                value={selectedRace}
                onChange={(e) => setSelectedRace(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary outline-none transition-colors text-slate-800 text-base"
              >
                <option value="todos">Todas</option>
                {races.map((race) => (
                  <option key={race} value={race}>
                    {race === 'Perro' ? '🐕 Perros' : '🐱 Gatos'}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">Género</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary outline-none transition-colors text-slate-800 text-base"
              >
                <option value="todos">Todos</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender === 'Macho' ? '♂️ Machos' : '♀️ Hembras'}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedRace('todos')
                    setSelectedGender('todos')
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 text-foreground hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center gap-2 text-base"
                >
                  <BiX className="w-4 h-4" />
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center">
          <p className="text-lg text-slate-800/70">
            Mostrando <span className="font-bold text-primary">{filteredPets.length}</span> de{' '}
            <span className="font-bold text-primary">{petsData.length}</span> mascotas
          </p>
        </div>

        {/* Pets Grid */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPets.map((pet) => (
              <PetCardItem key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              No encontramos mascotas
            </h3>
            <p className="text-lg text-slate-800/70 max-w-md mx-auto">
              Intenta con otros criterios de búsqueda o filtros
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedRace('todos')
                setSelectedGender('todos')
              }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Ver todas las mascotas
            </button>
          </div>
        )}
      </Container>
    </div>
  )
}