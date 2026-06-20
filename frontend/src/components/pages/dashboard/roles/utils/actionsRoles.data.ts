import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons";

export const actionsRoles: IActionButtons = {
  buttons: [
    {
      label: "Crear",
      onClick: () => {
        console.log("Crear rol")
      }
    }
  ]
}