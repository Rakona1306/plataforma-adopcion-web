"use client";

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import { useDeleteSpecie } from "@/core/application/features/shelter/species/hooks/useDeleteSpecie";
import { useModal } from "@/core/application/hooks/ui/useModal";
import useActionsSpecie from "./hooks/useActionsSpecie";
import { Divider } from "@mantine/core";
import FilterBar from "@/app/dashboard/_components/organism/filter-bar";
import CustomTable, {
  TableColumn,
} from "@/app/dashboard/_components/organism/custom-table";
import { Specie } from "@/core/domain/models/shelter/specie";
import { useGetAllSpecie } from "@/core/application/features/shelter/species/hooks/useGetAllSpecie";
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { UpdateSpecieForm, ViewSpecie } from "./organism";
import { BsViewList } from "react-icons/bs";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";

export default function SpeciePage() {
  const { deleteSpecieWithConfirmation, isPending } = useDeleteSpecie();
  const { handleOpenModal } = useModal() || {};
  const { actionsI } = useActionsSpecie();
  const { data, updateFilter, filter, handleClear, isLoading, isError } =
    useGetAllSpecie();

  const columns: TableColumn<Specie>[] = [
    { key: "name", label: "Nombre" },
    {
      key: "createdAt",
      label: "Creado",
      render: (specie) => formatDateTime(specie.createdAt),
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

  const actions: RowAction<Specie>[] = [
    {
      label: "Editar",
      icon: <BiEditAlt size={16} />,
      onClick: (specie) => {
        handleOpenModal?.({
          header: "Editar especie",
          content: <UpdateSpecieForm specie={specie} />,
        });
      },
    },
    {
      label: "Ver",
      icon: <BsViewList size={16} />,
      onClick: (specie) => {
        handleOpenModal?.({
          header: `Ver especie - #${specie.id}`,
          content: <ViewSpecie specie={specie} />,
        });
      },
    },
    {
      label: "Eliminar",
      icon: <BiTrash size={16} />,
      color: "red",
      onClick: (specie) => {
        deleteSpecieWithConfirmation(specie.id);
      },
    },
  ];

  return (
    <>
      <HeaderDashboard>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          Modulo de Especies
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Gestion de especies para el sistema
        </p>
      </HeaderDashboard>
      <BodyDashboard className="space-y-5">
        <ActionButtons title={actionsI.title} buttons={actionsI.buttons} />
        <Divider className="mt-5 border-gray-300!" />

        <FilterBar filters={myFilters} onClearAll={handleClear} />

        <Divider className="mt-5 border-gray-300!" />

        <div>
          <CustomTable<Specie>
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
