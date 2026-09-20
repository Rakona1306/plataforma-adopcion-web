import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { IUseActions } from "@/core/shared/types/actions/useAction";
import CreateUserForm from "../components/forms/create-user-form";

export default function useActionsUser(): IUseActions {
  const { handleOpenModal } = useModal() || {};
  const actionsI: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        onClick: () => {
          handleOpenModal?.({
            header: "Crear nuevo usuario",
            content: <CreateUserForm />,
          });
        },
      },
      {
        label: "Exportar",
        href: "/dashboard/usuarios/export",
      },
      {
        label: "Auditoría",
        href: "/dashboard/usuarios/audit",
      },
    ],
  };

  return {
    actionsI,
  };
}
