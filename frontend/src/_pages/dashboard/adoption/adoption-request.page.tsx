'use client'
import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import CustomTable, { TableColumn } from "@/app/dashboard/_components/organism/custom-table";
import { useModal } from "@/core/application/hooks/ui/useModal";
import AdoptionReviewForm from "@/features/business/request-adoptions/components/adoption-review-form";
import AdoptionReviewView from "@/features/business/request-adoptions/components/request-adoption-view";
import useAdoptionActions from "@/features/business/adoption/hooks/use-actions-adoption";
import { renderStatus } from "@/features/business/adoption/utils/renderStatus";
import { RequestAdoptionResponse } from "@/features/business/request-adoptions/dto/dashboard/request-adoption";
import usePaginateRequestAdoption from "@/features/business/request-adoptions/hooks/dashboard/use-paginate-request-adoption";
import { Divider } from "@mantine/core";
import { BiBullseye, BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import UpdateRequestAdoptionForm from "@/features/business/request-adoptions/components/update-request-adoption-form";
import useDeleteRequestAdoption from "@/features/business/request-adoptions/dto/dashboard/use-delete-request-adoption";

export default function AdoptionRequestsPage() {
    const { handleOpenModal } = useModal() || {}
    const { data, isLoading, isError, updateFilter, filter } = usePaginateRequestAdoption()
    const { actionsI } = useAdoptionActions()
    const { deleteConfirmed, isPending } = useDeleteRequestAdoption()

    const columns: TableColumn<RequestAdoptionResponse>[] = [
        { key: "id", label: "ID", render: (request) => `N-0${request.id}` },
        { key: "userName", label: "Usuario", render: (request) => `${request.user.name} ${request.user.lastName}` },
        { key: 'dni', label: 'DNI', render: (request) => request.user.dni || '-' },
        { key: 'email', label: 'Correo', render: (request) => request.user.email || '-' },
        { key: 'petName', label: 'Mascota', render: (request) => request.pet.name },
        { key: 'status', label: 'Estado', render: (request) => renderStatus(request.status) },
        { key: 'createdAt', label: 'Fecha de solicitud', render: (request) => new Date(request.createdAt).toLocaleDateString() },
        { key: 'district', label: 'Distrito' },
    ];

    const actions: RowAction<RequestAdoptionResponse>[] = [
        {
            label: 'Actualizar Estado',
            icon: <BiEdit />,
            onClick: (request) => {
                handleOpenModal?.({
                    header: 'Actualizar estado de solicitud',
                    content: <AdoptionReviewForm request={request} />
                })
            }
        },
        {
            label: 'Editar Solicitud',
            icon: <BiEdit />,
            onClick: (request) => {
                handleOpenModal?.({
                    header: 'Editar solicitud',
                    content: <UpdateRequestAdoptionForm requestAdoption={request} />
                })
            }
        },
        {
            label: 'Eliminar Solicitud',
            color: 'red',
            icon: <LuDelete />,
            onClick: (request) => {
                deleteConfirmed(request.id)
            }
        },
        {
            label: 'Ver Detalles',
            icon: <BiBullseye />,
            onClick: (request) => {
                handleOpenModal?.({
                    header: 'Detalles de solicitud',
                    content: <AdoptionReviewView request={request} />
                })
            }
        }
    ]

    return (
        <>
            <HeaderDashboard>
                <h1 className="text-lg md:text-2xl font-bold text-slate-800">
                    Modulo de Solicitudes de Adopción
                </h1>
                <p className="text-sm md:text-base text-gray-500">
                    Gestion de especies para el sistema
                </p>
            </HeaderDashboard>
            <BodyDashboard className="space-y-5">
                <ActionButtons title={actionsI.title} buttons={actionsI.buttons} />
                <Divider className="mt-5 border-gray-300!" />

                <div>
                    <CustomTable<RequestAdoptionResponse>
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