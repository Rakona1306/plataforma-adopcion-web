import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons"
import { useModal } from "@/core/application/hooks/ui/useModal"
import CreateUserForm from "../organism/create-user-form"


interface IUseActionsRole {
  actionsI: IActionButtons
}

export default function useActionsUser(): IUseActionsRole {
  const { handleOpenModal } = useModal() || {}
  const actionsI: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        onClick: () => {
          handleOpenModal?.({
            header: "Crear nuevo usuario",
            content: <CreateUserForm />
          })
        }
      }, {
        label: "Exportar",
        href: "/dashboard/usuarios/export",
      }, {
        label: "Auditoría",
        href: "/dashboard/usuarios/audit",
      }
    ]
  }

  return {
    actionsI
  }
}