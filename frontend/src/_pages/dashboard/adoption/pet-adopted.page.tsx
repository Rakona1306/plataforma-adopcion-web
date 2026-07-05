'use client'

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import CustomTable, { TableColumn } from "@/app/dashboard/_components/organism/custom-table";
import FilterBar from "@/app/dashboard/_components/organism/filter-bar";
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters";
import { useDeletePet } from "@/core/application/features/shelter/pets/hooks/useDeletePet";
import { useGetAllPet } from "@/core/application/features/shelter/pets/hooks/useGetAllPet";
import { Pet } from "@/core/domain/models/shelter/pet";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { formatDate } from "@/shared/utils/date/formatDate";
import { Badge, Divider } from "@mantine/core";
import { useRouter } from "next/navigation";
import { BsViewList } from "react-icons/bs";

export default function PetAdoptedPage() {

    const { filter, updateFilter, handleClear, data, isLoading, isError } = useGetAllPet({
        initialFilter: {
            isAdopted: true
        }
    });
    const router = useRouter();
    const { isPending } = useDeletePet();

    const columns: TableColumn<Pet>[] = [
        { key: "image", label: "Imagen", render: (pet) => pet.photoUrls.length > 0 ? <img src={pet.photoUrls[0].url} alt={pet.name} className="w-16 h-16 object-cover rounded" /> : <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded"><span className="text-gray-500 text-sm">Sin imagen</span></div> },
        { key: "name", label: "Nombre" },
        { key: "gender", label: "Género", render: (pet) => pet.gender.value === 'Hembra' ? <Badge color="pink">Hembra</Badge> : <Badge color="blue">Macho</Badge> },
        { key: "status", label: "Estado", render: (pet) => pet.isAdopted ? <Badge color="blue">Adoptado</Badge> : <Badge color="green">Disponible</Badge> },
        { key: "age", label: "Edad", render: (pet) => `${pet.age} años` },
        { key: "weightKg", label: "Peso (kg)", render: (pet) => `${pet.weightKg} kg` },
        { key: "birthDate", label: "Fecha de nacimiento", render: (pet) => formatDate(pet.birthDate) },
        { key: "specie", label: "Especie", render: (pet) => pet.speciesName },
        { key: "createdAt", label: "Creado", render: (pet) => formatDateTime(pet.createdAt), },
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

    const actions: RowAction<Pet>[] = [
        {
            label: 'Ver',
            icon: <BsViewList size={16} />,
            onClick(row) {
                router.push(`/dashboard/mascotas/${row.id}/ver`);
            }
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
                    <CustomTable<Pet>
                        columns={columns}
                        data={data?.items || []}
                        actions={actions}
                        keyExtractor={(user) => user.id}
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