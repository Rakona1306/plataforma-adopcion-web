'use client';

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import CustomTable, { TableColumn } from "@/app/dashboard/_components/organism/custom-table";
import FilterBar from "@/app/dashboard/_components/organism/filter-bar";
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters";
import { useDeleteTrait } from "@/core/application/features/shelter/traits/hooks/useDeleteTrait";
import { useGetAllTrait } from "@/core/application/features/shelter/traits/hooks/useGetAllTrait";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { Trait } from "@/core/domain/models/shelter/trait";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { Divider } from "@mantine/core";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import useActionsTrait from "./hooks/useActionsTrait";
import { UpdateTraitForm, ViewTrait } from "./organism";

export default function TraitPage() {
  const { data, updateFilter, isLoading, isError, filter, handleClear } = useGetAllTrait();
  const { deleteTraitWithConfirmation, isPending } = useDeleteTrait();
  const { handleOpenModal } = useModal() || {};
  const { actionsI } = useActionsTrait();

  const columns: TableColumn<Trait>[] = [
      { key: "name", label: "Nombre" },
      {
        key: "createdAt",
        label: "Creado",
        render: (trait) => formatDateTime(trait.createdAt),
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
  
    const actions: RowAction<Trait>[] = [
      {
        label: "Editar",
        icon: <BiEditAlt size={16} />,
        onClick: (trait) => {
          handleOpenModal?.({
            header: "Editar caracteristica",
            content: <UpdateTraitForm trait={trait} />,
          });
        },
      },
      {
        label: "Ver",
        icon: <BsViewList size={16} />,
        onClick: (trait) => {
          handleOpenModal?.({
            header: `Ver caracteristica - #${trait.id}`,
            content: <ViewTrait trait={trait} />,
          });
        },
      },
      {
        label: "Eliminar",
        icon: <BiTrash size={16} />,
        color: "red",
        onClick: (trait) => {
          deleteTraitWithConfirmation(trait.id);
        },
      },
    ];

  return (
    <>
      <HeaderDashboard>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          Modulo de Características
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Gestion de características para el sistema
        </p>
      </HeaderDashboard>
      <BodyDashboard className="space-y-5">
        <ActionButtons title={actionsI.title} buttons={actionsI.buttons} />
        <Divider className="mt-5 border-gray-300!" />

        <FilterBar filters={myFilters} onClearAll={handleClear} />

        <Divider className="mt-5 border-gray-300!" />

        <div>
          <CustomTable<Trait>
            columns={columns}
            data={data?.items || []}
            actions={actions}
            keyExtractor={(trait) => trait.id}
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
