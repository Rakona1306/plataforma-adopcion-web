'use client'

import { PetPublic } from '@/features/shelter/pet/model/pet-pub.model'
import { montserrat } from '@/lib/fonts/monserrat'
import { Card, Image, Text, Badge, Group, Stack, ActionIcon, Tooltip, Box, Flex, ThemeIcon } from '@mantine/core'
import { Heart, Calendar, Weight, Syringe, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function PetCard({
  id,
  name,
  breeds,
  description,
  photoUrls,
  gender,
  age,
  specie,
  weightKg,
  slug,
  size,
  status,
  isVaccinated,
  isSterilized,
  isAdopted,
}: PetPublic) {
  const [isFavorited, setIsFavorited] = useState(false)

  const photoUrl = photoUrls?.[0]?.url || `https://images.unsplash.com/photo-1633722715463-d30628519c8f?w=400&h=400&fit=crop`

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'adoptado':
        return 'green'
      case 'habilitado':
        return 'cyan'
      default:
        return 'gray'
    }
  }

  const getSizeColor = (size?: string) => {
    switch (size?.toLowerCase()) {
      case 'small':
        return 'cyan'
      case 'medium':
        return 'lime'
      case 'large':
        return 'red'
      default:
        return 'gray'
    }
  }

  const breedName = breeds?.[0]?.name || 'Raza desconocida'

  return (
    <Card
      shadow="md"
      p="0"
      radius="lg"
      className="overflow-hidden hover:shadow-xl hover:-translate-y-1 h-full flex flex-col bg-white transition-all duration-300"
      style={{
        border: '1px solid #e9ecef',
      }}
    >
      {/* Imagen y favorito */}
      <Box className="relative group overflow-hidden bg-gray-100" style={{ height: '280px' }}>
        <Link href={`/mascotas/${slug}`} className="block w-full h-full">
          <Image
            src={photoUrl}
            alt={name}
            height={280}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Badge de estado */}
        {status && (
          <Badge
            size="lg"
            radius="md"
            className="absolute top-3 left-3"

            color={getStatusColor(status.value)}
            leftSection={
              status.value.toLowerCase() === 'adopted' ? (
                <Sparkles size={12} />
              ) : null
            }
          >
            {status.value}
          </Badge>
        )}

        {/* Botón favorito */}
        <ActionIcon
          variant="filled"
          radius="50%"
          size="lg"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          color={isFavorited ? 'red' : 'white'}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart
            size={20}
            fill={isFavorited ? 'currentColor' : 'none'}
            stroke={isFavorited ? 'currentColor' : 'currentColor'}
          />
        </ActionIcon>

        {/* Overlay adoptado */}
        {isAdopted && (
          <Box className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Text size="xl" fw={700} c="white">
              ❤️ Adoptado
            </Text>
          </Box>
        )}
      </Box>

      {/* Contenido */}
      <Stack gap="xs" p="md" className="flex-1 flex flex-col">
        {/* Nombre y especie */}
        <div>
          <Text size="xl" fw={700} c="#1a1a1a" className={`line-clamp-1 font-extrabold! ${montserrat.className}`}>
            {name}
          </Text>
          <Text size="sm" c="dimmed" className="line-clamp-1">
            {specie ? specie.name : 'Especie desconocida'} • {breedName}
          </Text>
        </div>

        {/* Descripción */}
        <Text size="sm" c="#4a4a4a" className="line-clamp-2 grow">
          {description}
        </Text>

        {/* Badges de información */}
        <Group gap="xs">
          {gender && (
            <Badge size="sm" variant="light" radius="sm">
              {gender.value === 'MACHO' ? '♂️ Macho' : gender.value === 'HEMBRA' ? '♀️ Hembra' : gender.value}
            </Badge>
          )}
          {size && (
            <Badge size="sm" variant="light" radius="sm" color={getSizeColor(size.value)}>
              {size.value}
            </Badge>
          )}
        </Group>

        {/* Stats */}
        <Group gap="md" mt="xs">
          {age !== undefined && (
            <Flex align="center" gap={4} className="text-xs">
              <Calendar size={14} className="text-blue-500" />
              <Text size="xs">{age} años</Text>
            </Flex>
          )}
          {weightKg && (
            <Flex align="center" gap={4} className="text-xs">
              <Weight size={14} className="text-red-500" />
              <Text size="xs">{weightKg} kg</Text>
            </Flex>
          )}
        </Group>

        {/* Vacunas y esterilización */}
        {(isVaccinated || isSterilized) && (
          <Group gap="xs" mt="xs">
            {isVaccinated && (
              <Tooltip label="Completamente vacunado">
                <ThemeIcon size="sm" radius="md" variant="light" color="green">
                  <Syringe size={14} />
                </ThemeIcon>
              </Tooltip>
            )}
            {isSterilized && (
              <Tooltip label="Esterilizado">
                <ThemeIcon size="sm" radius="md" variant="light" color="blue">
                  <Sparkles size={14} />
                </ThemeIcon>
              </Tooltip>
            )}
          </Group>
        )}
      </Stack>

      {/* Botón de acción */}
      <Group grow p="md" gap="xs" className="border-t border-gray-100 flex! flex-row!">
        <Link
          href={`/mascotas/${slug}`}
          className="px-4 py-2 bg-linear-to-r from-primary to-red-700 text-white text-center rounded-md font-semibold hover:shadow-lg transition-shadow text-sm"
        >
          Ver Detalles
        </Link>

        <Link href={`/mascotas/${slug}#apadrinar`}
          className='px-4 py-2 bg-linear-to-r from-terciary to-yellow-500 text-center text-white rounded-md font-semibold hover:shadow-lg transition-shadow text-sm'
        >
          Apadrinar
        </Link>

      </Group>
    </Card>
  )
}
