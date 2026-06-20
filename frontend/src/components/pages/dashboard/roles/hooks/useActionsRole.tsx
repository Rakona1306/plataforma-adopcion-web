import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons"
import { useModal } from "@/core/application/hooks/ui/useModal"
import CreateRoleForm from "../organism/create-role-form"

interface IUseActionsRole {
  actionsRoles: IActionButtons
}

export default function useActionsRole(): IUseActionsRole {
  const { handleOpenModal } = useModal() || {}
  const actionsRoles: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        onClick: () => {
          handleOpenModal?.({
            header: "Crear nuevo rol",
            content: <CreateRoleForm />
          })
        }
      }, {
        label: "Exportar",
        href: "/dashboard/roles/export",
      }, {
        label: "Auditoría",
        href: "/dashboard/roles/audit",
      }
    ]
  }

  return {
    actionsRoles
  }
}