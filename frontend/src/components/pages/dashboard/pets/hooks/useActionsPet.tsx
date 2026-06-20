import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons";

export default function useActionsPet() {

  const actionsI: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        href: '/dashboard/mascotas/crear'
      },
    ],
  };

  return {
    actionsI,
  };
}
