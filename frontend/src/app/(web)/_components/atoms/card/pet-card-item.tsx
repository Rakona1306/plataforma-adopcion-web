'use client'

import { Pet } from '@/domain/models/Pet'
import Link from 'next/link'
import { useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import { FaSyringe } from 'react-icons/fa'
import Title from '../title'
import Button from '../button/button'

interface PetCardItemProps {
  pet: Pet
}

export function PetCardItem({ pet }: PetCardItemProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const getGenderLabel = (gender: string) => {
    return gender === 'Macho' ? '♂️' : '♀️'
  }

  const getRaceIcon = (raceName: string) => {
    return raceName === 'Perro' ? '🐕' : '🐱'
  }

  return (
    <Link href={`/mascotas/${pet.id}`}>
      <div className="group cursor-pointer h-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-64 md:h-72 overflow-hidden bg-gray-200">
            <img
              src={pet.images[0]?.url || '/placeholder.jpg'}
              alt={pet.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>


            {/* Badges */}
            <div className="absolute bottom-3 left-3 flex gap-2">
              {pet.isVaccinated && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-semibold">
                  <FaSyringe className="w-3 h-3" />
                  Vacunado
                </div>
              )}
              <div className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold">
                {pet.age} {pet.age === 1 ? 'año' : 'años'}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 flex-grow flex flex-col gap-4">
            {/* Name and Race */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Title htmlTag='h3' className="text-2xl! md:text-xl! font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {pet.name}
                </Title>
                <span className="text-xl">{getRaceIcon(pet.race.name)}</span>
              </div>
              <p className="text-sm text-slate-600">
                {pet.breed}
                <span className="ml-2">{getGenderLabel(pet.gender)}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-500 line-clamp-2">
              {pet.description}
            </p>

            {/* Characteristics */}
            <div className="flex flex-wrap gap-2">
              {pet.characteristics.slice(0, 2).map((char) => (
                <span
                  key={char.id}
                  className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                >
                  {char.name}
                </span>
              ))}
              {pet.characteristics.length > 2 && (
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-primary text-xs font-semibold">
                  +{pet.characteristics.length - 2} más
                </span>
              )}
            </div>

            {/* CTA Button */}
            <div className='flex gap-5'>
              <Button href={`/mascotas/${pet.id}`} className='flex-1 w-full font-bold' containerClassName='w-full'>
                Ver Detalles
              </Button>
              <Button href={`/mascotas/${pet.id}#padrinar`} className='flex-1 w-full border-terciary text-terciary before:bg-terciary! hover:text-white! font-bold' containerClassName='w-full'>
                Apadrinar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
