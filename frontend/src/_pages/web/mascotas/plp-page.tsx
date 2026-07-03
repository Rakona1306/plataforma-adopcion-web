"use client"

import { PetCard } from "@/app/(web)/_components/atoms/card/pet-card-item"
import Title from "@/app/(web)/_components/atoms/title"
import FilterDrawer from "@/app/(web)/_components/molecules/drawer/filter-drawer"
import Container from "@/components/atoms/container"
import { useGetPaginateSearch } from "@/features/shelter/pet/hooks/use-get-paginate-search"
import { Box, Flex, Pagination, Select, Skeleton, Text } from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { BiSearch } from "react-icons/bi"

export default function PetListPage() {

  const {
    data,
    isLoading,
    isError,
    filter,
    setSearch,
    setPage,
    isSearchPending,
    isSearchActive,
    updateFilter
  } = useGetPaginateSearch()

  if (isError) {
    return (
      <div className="h-full w-full flex justify-center items-center bg-white flex-col py-20">
        <Image width={400} height={400} src={'/errors/maskot-error.webp'} alt="maskot-error" />
        <div>
          <Title className="lg:text-5xl! text-center">
            Hemos tenido algunos problemas...
          </Title>
          <Text className="text-center! text-gray-500 lg:text-lg! font-medium" >
            Vuelva a intentarlo mas tarde
          </Text>

          <footer className="mt-10 flex gap-10 h-auto w-full flex-row justify-center items-center" >
            <Link href={'/'} className="w-fit bg-primary text-white px-6 py-3 rounded-xl lg:text-base text-sm">
              Ir a Inicio
            </Link>
            <button
              onClick={() => {
                window.location.reload()
              }}
              className="bg-red-200 rounded-xl text-sm lg:text-base px-6 py-3 text-red-600 cursor-pointer"
            >
              Intentar denuevo
            </button>
          </footer>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-primary/5 py-12 md:py-16">
      <Container className=" space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Conoce a nuestras{" "}
            <span className="text-primary">mascotas</span>
          </h1>
          <p className="text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            Cada animal merece un hogar lleno de amor. Encuentra tu compañero perfecto aquí.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 items-center bg-white border border-gray-200 rounded-2xl px-6 py-8">
          <Flex w={'100%'} gap={'lg'}>
            <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 h-full w-full">
              <BiSearch size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Busca por nombre, raza o característica..."
                value={filter.search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-slate-800 placeholder:text-gray-400 flex-1 w-full py-3"
              />

            </div>
            <FilterDrawer />
          </Flex>
          <Flex w={'100%'} justify={'space-between'} align={'flex-end'}>
            <Select
              label='Ordenar por:'
              classNames={{
                input: 'hover:bg-gray-200! text-sm! py-3!'
              }}
              data={[
                { value: "recommended", label: "Recomendados" },
                { value: "name_asc", label: "Nombre (A - Z)" },
                { value: "name_desc", label: "Nombre: (Z - A)" }
              ]}
              defaultValue={'recommended'}
              onChange={(value) => updateFilter({ sort: value ?? '' })}
            />

            {
              isLoading ? (
                <Flex className="w-fit! h-full! gap-5! items-center!">
                  <Skeleton width={'11rem'} h={'2.3rem'} />
                  <Skeleton width={'14rem'} h={'3rem'} />
                </Flex>
              ) : (
                <Flex align={'center'} className="gap-5! w-fit! h-full!">
                  <p className="text-slate-400">Mostrando {data ? data.totalCount : ''} mascotas</p>
                  <Box className="w-fit!">
                    <Pagination size={'input-sm'} classNames={{
                      control: 'data-[active]:bg-primary! border-terciary!'
                    }} total={data?.totalPages ?? 0} value={data?.page} onChange={(value) => setPage(value)} />
                  </Box>
                </Flex>
              )
            }
          </Flex>
        </div>

        <Box w={'100%'} h={'auto'}>

          {
            isLoading || (isSearchPending && isSearchActive) ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />

                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />

                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />

                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                  <Skeleton w={'100%'} h={'25rem'} radius={'lg'} />
                </div>
              </>
            ) : (
              <>
                {data && data?.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {data && data?.items.map((pet) => (
                      <PetCard key={pet.id} {...pet} />
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
                  </div>
                )}
              </>
            )
          }
        </Box>
      </Container>
    </div>
  )
}