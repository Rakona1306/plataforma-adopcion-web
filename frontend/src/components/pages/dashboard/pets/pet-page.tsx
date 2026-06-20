"use client"

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import FilterBar from "@/app/dashboard/_components/organism/filter-bar";
import { Badge, Divider } from "@mantine/core";
import useActionsPet from "./hooks/useActionsPet";
import CustomTable, { TableColumn } from "@/app/dashboard/_components/organism/custom-table";
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { Pet } from "@/core/domain/models/shelter/pet";
import { useGetAllPet } from "@/core/application/features/shelter/pets/hooks/useGetAllPet";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { useRouter } from "next/navigation";
import { useDeletePet } from "@/core/application/features/shelter/pets/hooks/useDeletePet";
import { IoImageOutline } from "react-icons/io5";
import { BsViewList } from "react-icons/bs";
import { CreatePetPhotoForm } from "@/features/shelter/pet-photos/components/molecules/create-pet-photo-form";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { formatDate } from "@/shared/utils/date/formatDate";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdVaccines } from "react-icons/md";

export default function PetPage() {
  const { actionsI } = useActionsPet();
  const { filter, updateFilter, handleClear, data, isLoading, isError } = useGetAllPet();
  const router = useRouter();
  const { deletePetWithConfirmation, isPending } = useDeletePet();
  const { handleOpenModal } = useModal() || {};

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
      label: "Editar",
      icon: <BiEditAlt size={16} />,
      onClick(row) {
        router.push(`/dashboard/mascotas/${row.id}/editar`);
      }
    },
    {
      label: 'Ver',
      icon: <BsViewList size={16} />,
      onClick(row) {
        router.push(`/dashboard/mascotas/${row.id}/ver`);
      }
    },
    {
      label: 'Adjuntar Registro Medico',
      icon: <AiOutlineMedicineBox size={16} />,
      onClick(row) {
        console.log(row)
      }
    },
    {
      label: 'Asignar Vacunas',
      icon: <MdVaccines />,
      onClick(row) {
        router.push(`/dashboard/mascotas/${row.id}/vacunas`);
      }
    },
    {
      label: 'Asignar Imagenes',
      icon: <IoImageOutline size={16} />,
      onClick(row) {
        handleOpenModal?.({
          header: `Asignar imágenes a ${row.name}`,
          content: <CreatePetPhotoForm petId={row.id} />,
        });
      }
    },
    {
      label: "Eliminar",
      icon: <BiTrash size={16} />,
      color: "red",
      onClick: (pet) => {
        deletePetWithConfirmation(pet.id);
      },
    }
  ];

  return (
    <>
      <HeaderDashboard>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          Modulo de mascotas
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Gestion de mascotas en el albergue
        </p>
      </HeaderDashboard>
      <BodyDashboard className="space-y-5">
        <ActionButtons title={actionsI.title} buttons={actionsI.buttons} />
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
