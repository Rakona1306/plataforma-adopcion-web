'use client'
import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import CustomTable, { TableColumn } from "@/app/dashboard/_components/organism/custom-table";
import { useModal } from "@/core/application/hooks/ui/useModal";
import AdoptionReviewForm from "@/features/business/adoption/components/adoption-review-form";
import AdoptionReviewView from "@/features/business/adoption/components/adoption-review-view";
import { RequestAdoptionResponse } from "@/features/business/adoption/dto/request-adoption-response";
import useAdoptionActions from "@/features/business/adoption/hooks/use-actions-adoption";
import usePaginateAdoptionRequest from "@/features/business/adoption/hooks/use-paginate-adoption-request"
import { renderStatus } from "@/features/business/adoption/utils/renderStatus";
import { Divider } from "@mantine/core";
import { BiBullseye, BiEdit } from "react-icons/bi";

export default function AdoptionRequestsPage() {
    const { handleOpenModal } = useModal() || {}
    const { data, isLoading, isError, updateFilter, filter } = usePaginateAdoptionRequest()
    const { actionsI } = useAdoptionActions()

    const columns: TableColumn<RequestAdoptionResponse>[] = [
        { key: "userName", label: "Usuario" },
        { key: 'petName', label: 'Mascota' },
        { key: 'status', label: 'Estado', render: (request) => renderStatus(request.status) },
        { key: 'createdAt', label: 'Fecha de solicitud', render: (request) => new Date(request.createdAt).toLocaleDateString() },
        { key: 'district', label: 'Distrito' },
    ];

    const actions: RowAction<RequestAdoptionResponse>[] = [
        {
            label: 'Actualizar estado',
            color: 'blue',
            icon: <BiEdit />,
            onClick: (request) => {
                handleOpenModal?.({
                    header: 'Actualizar estado de solicitud',
                    content: <AdoptionReviewForm request={request} />
                })
            }
        },
        {
            label: 'Ver detalles',
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