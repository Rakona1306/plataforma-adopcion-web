"use client";

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard";
import { ActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import CustomTable, {
  TableColumn,
} from "@/app/dashboard/_components/organism/custom-table";
import FilterBar from "@/app/dashboard/_components/organism/filter-bar";
import { useGetAllUser } from "@/core/application/features/organization/user/hooks/useGetAllUser";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { Divider } from "@mantine/core";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { RowAction } from "@/app/dashboard/_components/molecules/table-actions";
import { BsViewList } from "react-icons/bs";
import { useDeleteUser } from "@/core/application/features/organization/user/hooks/useDeleteUser";
import useActionsUser from "./hooks/useActionsUser";
import { FilterItemConfig } from "@/app/dashboard/_interfaces/ui/filters";
import UpdateUserForm from "./organism/update-user-form";
import { User } from "@/core/domain/models/organization/user";
import { ViewUser } from "./organism";
import { CgPassword } from "react-icons/cg";
import { ChangePasswordForm } from "./organism/change-password-form";

export default function UsersPage() {
  const { data, updateFilter, filter, handleClear, isLoading, isError } =
    useGetAllUser();
  const { handleOpenModal } = useModal() || {};
  const { deleteUserWithConfirmation, isPending } = useDeleteUser();
  const { actionsI } = useActionsUser();

  const columns: TableColumn<User>[] = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Correo" },
    { key: "dni", label: "DNI" },
    { key: "ruc", label: "RUC" },
    { key: "phone", label: "Telefono" },
    { key: "district", label: "Distrito" },
    { key: "isBlocked", label: "Bloqueado" },
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

  const myFilters: FilterItemConfig[] = [
    {
      type: "search",
      label: "Buscador",
      placeholder: "Nombre o correo...",
      value: filter.search,
      onChange: (val) => updateFilter({ search: String(val) }),
    },
    {
      type: "select",
      label: "Bloqueados",
      options: [
        { label: "Sí", value: "true" },
        { label: "No", value: "false" },
        { label: "Todos", value: "todos" },
      ],
      value: filter.isBlocked?.toString() ?? null,
      onChange: (val) => updateFilter({ isBlocked: val ?? "todos" }),
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

        <FilterBar filters={myFilters} onClearAll={handleClear} />

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
