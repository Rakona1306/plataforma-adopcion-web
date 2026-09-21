"use client";
import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import { Divider } from "@mantine/core";
import useActionsRole from "./hooks/useActionsRole";
import CustomTable, {
  TableColumn,
} from "@/components/ui/organisms/table/table-custom";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { UpdateRoleForm, ViewRole } from "./organism";
import { Role } from "@/features/organization/role/model/role.model";
import { useGetAllRoles } from "@/features/organization/role/hooks/use-get-all-role";
import { useDeleteRole } from "@/features/organization/role/hooks/useDeleteRole";
import FilterSection from "@/components/ui/organisms/filter/filter-section";
import FilterRoleDrawer from "@/features/organization/role/components/drawer/filter-role-drawer";

export default function RolesPage() {
  const { actionsRoles } = useActionsRole();
  const { data, updateFilter, filter, handleClear, isLoading, isError } =
    useGetAllRoles();
  const { deleteRoleWithConfirmation, isPending } = useDeleteRole();
  const { handleOpenModal } = useModal() || {};
  const columns: TableColumn<Role>[] = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripcion" },
    { key: "usersCount", label: "Usuarios Asignados" },
    {
      key: "createdAt",
      label: "Creado en",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  // 3. Definición de acciones disponibles por fila
  const actions: RowAction<Role>[] = [
    {
      label: "Editar",
      icon: <BiEditAlt size={16} />,
      onClick: (role) => {
        handleOpenModal?.({
          header: "Editar rol",
          content: <UpdateRoleForm role={role} />,
        });
      },
    },
    {
      label: "Ver",
      icon: <BsViewList size={16} />,
      onClick: (user) => {
        handleOpenModal?.({
          header: `Ver rol - #${user.id}`,
          content: <ViewRole role={user} />,
        });
      },
    },
    {
      label: "Eliminar",
      icon: <BiTrash size={16} />,
      color: "red",
      onClick: (role) => {
        deleteRoleWithConfirmation(role.id);
      },
    },
  ];

  return (
    <>
      <p>{filter.sort} wa</p>
      <HeaderDashboard>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          Sistema de Roles
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Gestion roles y permisos para los usuarios
        </p>
      </HeaderDashboard>
      <BodyDashboard className="space-y-5">
        <ActionButtons
          title={actionsRoles.title}
          buttons={actionsRoles.buttons}
        />
        <FilterSection
          orderBy={{
            options: [
              { value: "", label: "Mas Recientes" },
              { value: "createdAt_asc", label: "Mas Antiguos" },
              { value: "name_asc", label: "Nombre (A-Z)" },
              { value: "name_desc", label: "Nombre (Z-A)" },
            ],
            label: "Ordenar por",
            onSelected: (value) => {
              updateFilter({ sort: value });
            },
            defaultValue: "Mas Recientes",
          }}
          search={{
            placeholder: "Buscar Roles...",
            onSearch: (value) => {
              updateFilter({ search: String(value) });
            },
            label: "Buscar",
            name: "search",
            value: filter.search,
          }}
          filter={{
            drawer: (close) => <FilterRoleDrawer onApply={close} />,
            title: "Filtros de roles ",
          }}
          onClearAll={handleClear}
        />
        <Divider className="mt-5 border-gray-300!" />
        <Divider className="mt-5 border-gray-300!" />

        <div>
          <CustomTable<Role>
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
