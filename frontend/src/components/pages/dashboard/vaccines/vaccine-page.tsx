"use client";
import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import CustomTable, { TableColumn } from "@/app/dashboard/_components/organism/custom-table";
import FilterBar from "@/app/dashboard/_components/organism/filter-bar";
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters";
import { useDeleteVaccine } from "@/core/application/features/shelter/vaccines/hooks/useDeleteVaccine";
import { useGetAllVaccine } from "@/core/application/features/shelter/vaccines/hooks/useGetAllVaccine";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { Vaccine } from "@/core/domain/models/shelter/vaccine";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { Divider } from "@mantine/core";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { UpdateVaccineForm, ViewVaccine } from "./organism";
import useActionsVaccine from "./hooks/useActionsVaccine";

export default function VaccinePage() {

  const { deleteVaccineWithConfirmation, isPending } = useDeleteVaccine();
    const { handleOpenModal } = useModal() || {};
    const { actionsI } = useActionsVaccine();
    const { data, updateFilter, filter, handleClear, isLoading, isError } =
      useGetAllVaccine();

  const columns: TableColumn<Vaccine>[] = [
    { key: "name", label: "Nombre" },
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
      placeholder: "Nombre o correo...",
      value: filter.search,
      onChange: (val) => updateFilter({ search: String(val) }),
    },
  ];

  const actions: RowAction<Vaccine>[] = [
    {
      label: "Editar",
      icon: <BiEditAlt size={16} />,
      onClick: (item) => {
        handleOpenModal?.({
          header: "Editar vacuna",
          content: <UpdateVaccineForm vaccine={item} />,
        });
      },
    },
    {
      label: "Ver",
      icon: <BsViewList size={16} />,
      onClick: (item) => {
        handleOpenModal?.({
          header: `Ver vacuna - #${item.id}`,
          content: <ViewVaccine vaccine={item} />,
        });
      },
    },
    {
      label: "Eliminar",
      icon: <BiTrash size={16} />,
      color: "red",
      onClick: (specie) => {
        deleteVaccineWithConfirmation(specie.id);
      },
    },
  ];

  return (
    <>
      <HeaderDashboard>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          Sistema de Vacunas
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Gestion de vacunas para el sistema
        </p>
      </HeaderDashboard>
      <BodyDashboard className="space-y-5">
        <ActionButtons title={actionsI.title} buttons={actionsI.buttons} />
        <Divider className="mt-5 border-gray-300!" />

        <FilterBar filters={myFilters} onClearAll={handleClear} />

        <Divider className="mt-5 border-gray-300!" />

        <div>
          <CustomTable<Vaccine>
            columns={columns}
            data={data?.items || []}
            actions={actions}
            keyExtractor={(item) => item.id}
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
