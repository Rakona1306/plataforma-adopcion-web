"use client"

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard"
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard"
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons"
import { Divider } from "@mantine/core"
import useActionsRole from "./hooks/useActionsRole"
import CustomTable, { TableColumn } from "@/app/dashboard/_components/organism/custom-table"
import { User } from "@/core/domain/models/User"
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions"
import { BiEditAlt, BiTrash } from "react-icons/bi"
import { useState } from "react"
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters"
import FilterBar from "@/app/dashboard/_components/organism/filter-bar"

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleSelected, setRoleSelected] = useState<string | null>(null);
  const [statusSelected, setStatusSelected] = useState<string | null>(null);
  const [dateSelected, setDateSelected] = useState<string | null>(null);
  const { actionsRoles } = useActionsRole()

  const users: User[] = [];

  const columns: TableColumn<User>[] = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripcion" },
    { key: "createdAt", label: "Creado en" }
  ];

  // 3. Definición de acciones disponibles por fila
  const actions: RowAction<User>[] = [
    {
      label: "Editar",
      icon: <BiEditAlt size={16} />,
      onClick: (user) => console.log("Editando a:", user.name),
    },
    {
      label: "Eliminar",
      icon: <BiTrash size={16} />,
      color: "red",
      onClick: (user) => alert(`Eliminar ID: ${user.id}`),
    },
  ];

  const myFilters: FilterItemConfig[] = [
    {
      type: "search",
      label: "Buscador",
      placeholder: "Nombre o correo...",
      value: searchTerm,
      onChange: setSearchTerm, // 👈 Pasamos el setState directo
    }
  ];

  const handleClearAllStates = () => {
    setSearchTerm("");
    setRoleSelected(null);
    setStatusSelected(null);
    setDateSelected(null);
  };

  return (
    <>
      <HeaderDashboard>
        <h1 className="text-2xl font-bold text-slate-800">Sistema de Roles</h1>
        <p className="text-gray-500">Gestion roles y permisos para los usuarios</p>
      </HeaderDashboard>
      <BodyDashboard className="space-y-5">
        <ActionButtons
          title={actionsRoles.title}
          buttons={actionsRoles.buttons}
        />
        <Divider className="mt-5 border-gray-300!" />

        <FilterBar filters={myFilters} onClearAll={handleClearAllStates} />

        <Divider className="mt-5 border-gray-300!" />

        <div>
          <CustomTable
            columns={columns}
            data={users}
            actions={actions}
            keyExtractor={(user) => user.id}
          />
        </div>
      </BodyDashboard>
    </>
  )
}

/*
  const myFilters: FilterItemConfig[] = [
    {
      type: "search",
      label: "Buscador",
      placeholder: "Nombre o correo...",
      value: searchTerm,
      onChange: setSearchTerm, // 👈 Pasamos el setState directo
    },
    {
      type: "select",
      label: "Rol",
      options: [
        { label: "Admin", value: "ADMIN" },
        { label: "Usuario", value: "USER" },
      ],
      value: roleSelected,
      onChange: setRoleSelected, // 👈 Pasamos el setState directo
    },
    {
      type: "select",
      label: "Estado",
      options: [
        { label: "Activo", value: "ACTIVE" },
        { label: "Inactivo", value: "INACTIVE" },
      ],
      value: statusSelected,
      onChange: setStatusSelected, // 👈 Pasamos el setState directo
    },
    {
      type: "date",
      label: "Fecha Límite",
      value: dateSelected,
      onChange: setDateSelected, // 👈 Pasamos el setState directo
    },
  ];
*/