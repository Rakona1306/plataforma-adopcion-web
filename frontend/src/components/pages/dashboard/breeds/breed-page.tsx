"use client";

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import CustomTable, { TableColumn } from "@/app/dashboard/_components/organism/custom-table";
import FilterBar from "@/app/dashboard/_components/organism/filter-bar";
import { Breed } from "@/core/domain/models/shelter/breed";
import { Divider } from "@mantine/core";
import useActionsBreed from "./hooks/useActionsBreed";
import { useGetAllBreed } from "@/core/application/features/shelter/breeds/hooks/useGetAllBreed";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useDeleteBreed } from "@/core/application/features/shelter/breeds/hooks/useDeleteBreed";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { UpdateBreedForm, ViewBreed } from "./organism";
import { BsViewList } from "react-icons/bs";
import { useGetAllSpecie } from "@/core/application/features/shelter/species/hooks/useGetAllSpecie";

export default function BreedPage() {

  const { actionsI } = useActionsBreed();
  const { data, updateFilter, filter, handleClear, isLoading, isError } = useGetAllBreed();
  const { deleteBreedWithConfirmation, isPending } = useDeleteBreed();
  const { handleOpenModal } = useModal() || {};
  const { data: dataSpecie } = useGetAllSpecie();

  const columns: TableColumn<Breed>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "speciesName", label: "Especie" },
    {
      key: "createdAt",
      label: "Creado",
      render: (item) => formatDateTime(item.createdAt),
    },
  ];

  const myFilters: FilterItemConfig[] = [
    {
      type: "search",
      label: "Buscar",
      value: filter.search,
      onChange: (val) => updateFilter({ search: String(val) }),
    },
    {
      type: "select-search",
      label: "Buscar por especie",
      placeholder: "Buscar especie",
      options: dataSpecie?.items || [],
      value: filter.speciesId,
      displayField: 'name',
      valueField: 'id',
      onChange: (val) => updateFilter({ speciesId: String(val) }),
    },
  ];

  const actions: RowAction<Breed>[] = [
    {
      label: "Editar",
      icon: <BiEditAlt size={16} />,
      onClick: (item) => {
        handleOpenModal?.({
          header: "Editar especie",
          content: <UpdateBreedForm breed={item} />,
        });
      },
    },
    {
      label: "Ver",
      icon: <BsViewList size={16} />,
      onClick: (item) => {
        handleOpenModal?.({
          header: `Ver especie - #${item.id}`,
          content: <ViewBreed breed={item} />,
        });
      },
    },
    {
      label: "Eliminar",
      icon: <BiTrash size={16} />,
      color: "red",
      onClick: (specie) => {
        deleteBreedWithConfirmation(specie.id);
      },
    },
  ];

  return (
      <>
        <HeaderDashboard>
          <h1 className="text-lg md:text-2xl font-bold text-slate-800">
            Sistema de Razas
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Gestion de razas para el sistema
          </p>
        </HeaderDashboard>
        <BodyDashboard className="space-y-5">
          <ActionButtons title={actionsI.title} buttons={actionsI.buttons} />
          <Divider className="mt-5 border-gray-300!" />
  
          <FilterBar filters={myFilters} onClearAll={handleClear} />
  
          <Divider className="mt-5 border-gray-300!" />
  
          <div>
            <CustomTable<Breed>
              columns={columns}
              data={data?.items || []}
              actions={actions}
              keyExtractor={(specie) => specie.id}
              isLoading={isLoading || isPending}
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