import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons"

interface IUseActionsRole {
  actionsRoles: IActionButtons
}

export default function useActionsRole(): IUseActionsRole {

  const actionsRoles: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        onClick: () => {
          console.log("Crear rol")
        }
      }, {
        label: "Exportar",
        href: "/dashboard/roles/export",
      }
    ]
  }

  return {
    actionsRoles
  }
}