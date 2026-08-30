"use client";

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import CustomTable, {
  TableColumn,
} from "@/app/dashboard/_components/organism/custom-table";
import FilterBar from "@/app/dashboard/_components/organism/filter-bar";
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { PetMostRequestedResponse } from "@/features/shelter/pet/dto/dashboard/pet-most-requested-response";
import useGetPetMostRequested from "@/features/shelter/pet/hooks/use-get-pet-most-requested";
import { Badge, Divider, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { BsViewList } from "react-icons/bs";

export default function PetMostRequestedPage() {
  const { filter, updateFilter, handleClear, data, isLoading, isError } =
    useGetPetMostRequested();
  const router = useRouter();

  const columns: TableColumn<PetMostRequestedResponse>[] = [
    {
      key: "image",
      label: "Imagen",
      render: (pet) =>
        pet.photos.length > 0 ? (
          <img
            src={pet.photos[0].url}
            alt={pet.name}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-500 text-sm">Sin imagen</span>
          </div>
        ),
    },
    { key: "name", label: "Nombre" },
    {
      key: "gender",
      label: "Género",
      render: (pet) =>
        pet.gender === "Hembra" ? (
          <Badge color="pink">Hembra</Badge>
        ) : (
          <Badge color="blue">Macho</Badge>
        ),
    },
    { key: "age", label: "Edad", render: (pet) => `${pet.age} años` },
    {
      key: "requestCount",
      label: "Cantidad de Solicitudes",
      render: (pet) => <Text>{pet.requestCount}</Text>,
    },
    { key: "specie", label: "Especie", render: (pet) => pet.species.name },
    {
      key: "birthDate",
      label: "Fecha de Nacimiento",
      render: (pet) => formatDateTime(pet.birthDate ?? "", true),
    },
  ];

  const myFilters: FilterItemConfig[] = [
    {
      type: "search",
      label: "Buscar",
      placeholder: "Nombre o correo...",
      value: filter.search,
      onChange: (val) => updateFilter({ search: String(val) }),
    },
  ];

  const actions: RowAction<PetMostRequestedResponse>[] = [
    {
      label: "Ver",
      icon: <BsViewList size={16} />,
      onClick(row) {
        router.push(`/dashboard/mascotas/${row.id}/ver`);
      },
    },
  ];

  return (
    <>
      <HeaderDashboard>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          Modulo de mascotas adoptadas
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Gestion de mascotas en el albergue
        </p>
      </HeaderDashboard>
      <BodyDashboard className="space-y-5">
        {/*<ActionButtons title={actionsI.title} buttons={actionsI.buttons} /> */}
        <Divider className="mt-5 border-gray-300!" />

        <FilterBar filters={myFilters} onClearAll={handleClear} />

        <Divider className="mt-5 border-gray-300!" />

        <div>
          <CustomTable<PetMostRequestedResponse>
            columns={columns}
            data={data?.items || []}
            actions={actions}
            keyExtractor={(user) => user.id}
            isLoading={isLoading}
            isError={isError}
            onPageChange={(page) => updateFilter({ page })}
            totalItems={data?.totalCount || 0}
            page={filter.page}
          />
        </div>
      </BodyDashboard>
    </>
  );
}
