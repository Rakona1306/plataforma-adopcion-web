"use client";

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import CustomTable, {
  TableColumn,
} from "@/components/ui/organisms/table/table-custom";
import { useGetAllUser } from "@/features/organization/user/hooks/use-get-user";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { Badge, Divider } from "@mantine/core";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { BsViewList } from "react-icons/bs";
import { useDeleteUser } from "@/core/application/features/organization/user/hooks/useDeleteUser";
import useActionsUser from "./hooks/useActionsUser";
import UpdateUserForm from "./organism/update-user-form";
import { User } from "@/core/domain/models/organization/user";
import { ViewUser } from "./organism";
import { CgPassword } from "react-icons/cg";
import { ChangePasswordForm } from "./organism/change-password-form";
import FilterSection from "@/components/ui/organisms/filter/filter-section";
import FilterUserDrawer from "@/features/organization/user/components/drawer/filter-user-drawer";

export default function UsersPage() {
  const { data, updateFilter, filter, handleClear, isLoading, isError } =
    useGetAllUser();
  const { handleOpenModal } = useModal() || {};
  const { deleteUserWithConfirmation, isPending } = useDeleteUser();
  const { actionsI } = useActionsUser();

  const columns: TableColumn<User>[] = [
    { key: "name", label: "Nombre" },
    { key: "lastName", label: "Apellido" },
    { key: "email", label: "Correo" },
    { key: "dni", label: "DNI" },
    { key: "phone", label: "Telefono" },
    { key: "district", label: "Distrito" },
    {
      key: "isBlocked",
      label: "Estado",
      render: (row) =>
        row.isBlocked ? (
          <Badge color="red">Bloqueado</Badge>
        ) : (
          <Badge color="green">Activo</Badge>
        ),
    },
    { key: "roleId", label: "Rol", render: (row) => row.role?.name },
  ];

  const actions: RowAction<User>[] = [
    {
      label: "Editar",
      icon: <BiEditAlt size={16} />,
      onClick: (user) => {
        handleOpenModal?.({
          header: "Editar usuario",
          content: <UpdateUserForm user={user} />,
        });
      },
    },
    {
      label: "Cambiar contraseña",
      icon: <CgPassword size={16} />,
      onClick: (user) => {
        handleOpenModal?.({
          header: "Cambiar contraseña",
          content: <ChangePasswordForm user={user} />,
        });
      },
    },
    {
      label: "Ver",
      icon: <BsViewList size={16} />,
      onClick: (user) => {
        handleOpenModal?.({
          header: `Ver usuario - #${user.id}`,
          content: <ViewUser user={user} />,
        });
      },
    },
    {
      label: "Eliminar",
      icon: <BiTrash size={16} />,
      color: "red",
      onClick: (user) => {
        deleteUserWithConfirmation(user.id);
      },
    },
  ];

  return (
    <>
      <HeaderDashboard>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          Sistema de Usuarios
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Gestion de usuarios y permisos para el sistema
        </p>
      </HeaderDashboard>
      <BodyDashboard className="space-y-5">
        <ActionButtons title={actionsI.title} buttons={actionsI.buttons} />
        <Divider className="mt-5 border-gray-300!" />

        <FilterSection
          orderBy={{
            options: [
              { value: "", label: "Mas Recientes" },
              { value: "createdAt_desc", label: "Mas Antiguos" },
              { value: "name_asc", label: "Nombre (A-Z)" },
              { value: "name_desc", label: "Nombre (Z-A)" },
              { value: "email_asc", label: "Email (A-Z)" },
              { value: "email_desc", label: "Email (Z-A)" },
              { value: "isBlocked_true", label: "Bloqueado" },
              { value: "isBlocked_false", label: "Activo" },
            ],
            label: "Ordenar por",
            onSelected: (value) => {
              updateFilter({ sort: value });
            },
            defaultValue: "Mas Recientes",
          }}
          search={{
            placeholder: "Buscar usuarios...",
            onSearch: (value) => {
              updateFilter({ search: String(value) });
            },
            label: "Buscar",
            name: "search",
            value: filter.search,
          }}
          filter={{
            drawer: (close) => <FilterUserDrawer onApply={close} />,
            title: "Filtros de Usuarios",
          }}
          onClearAll={handleClear}
        />

        <Divider className="mt-5 border-gray-300!" />

        <div>
          <CustomTable<User>
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
