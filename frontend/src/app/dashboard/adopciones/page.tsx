"use client";

import { Badge, Divider } from "@mantine/core";
import BodyDashboard from "../_components/molecules/body-dashboard";
import HeaderDashboard from "../_components/molecules/header-dashboard";
import CustomTable, { TableColumn } from "../_components/organism/custom-table";
import usePaginateAdoption from "@/features/business/adoption/hooks/use-paginate-adoption-request";
import { AdoptionResponse } from "@/features/business/adoption/dto/dashboard/adoption-response";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { RowAction } from "../_components/molecules/table-actions";
import AdoptionViewModal from "@/features/business/adoption/components/adoption-view-modal";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { ViewIcon } from "lucide-react";
import { GiObservatory } from "react-icons/gi";
import { useRouter } from "next/navigation";

function returnStatus(status: string) {
  if (status === "DESHABILITADA") {
    return "red";
  } else {
    return "green";
  }
}

export default function AdoptionPageNext() {
  const { data, isLoading, isError, updateFilter, filter } =
    usePaginateAdoption();
  const { handleOpenModal } = useModal() || {};
  const router = useRouter();

  const columns: TableColumn<AdoptionResponse>[] = [
    { key: "id", label: "ID", render: (request) => `N-0${request.id}` },
    {
      key: "userName",
      label: "Usuario",
      render: (request) =>
        `${request.requestAdoption.user.name} ${request.requestAdoption.user.lastName}`,
    },
    {
      key: "dni",
      label: "DNI",
      render: (request) => request.requestAdoption.user.dni || "-",
    },
    {
      key: "email",
      label: "Correo",
      render: (request) => request.requestAdoption.user.email || "-",
    },
    {
      key: "petName",
      label: "Mascota",
      render: (request) => request.requestAdoption.pet.name,
    },
    {
      key: "status",
      label: "Estado",
      render: (request) => (
        <Badge color={returnStatus(request.status)}>{request.status}</Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Fecha de solicitud",
      render: (request) => formatDateTime(request.createdAt),
    },
  ];

  const actions: RowAction<AdoptionResponse>[] = [
    {
      label: "Ver Datos",
      icon: <ViewIcon />,
      onClick(row) {
        if (handleOpenModal) {
          handleOpenModal({
            header: "Ver Adopcion",
            content: <AdoptionViewModal adoption={row} />,
          });
        }
      },
    },
    {
      label: "Ingresar Observaciones",
      icon: <GiObservatory />,
      onClick(row) {
        router.push(`/dashboard/adopciones/${row.id}`);
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
        {/* <FilterBar filters={myFilters} onClearAll={handleClear} /> */}

        <Divider className="mt-5 border-gray-300!" />

        <div>
          <CustomTable<AdoptionResponse>
            columns={columns}
            actions={actions}
            data={data?.items || []}
            keyExtractor={(adoption) => adoption.id}
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
