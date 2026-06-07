import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { CreateTraitForm } from "../organism";

export default function useActionsTrait() {
  const { handleOpenModal } = useModal() || {};

  const actionsI: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        onClick: () => {
          handleOpenModal?.({
            header: "Crear nueva caracteristica",
            content: <CreateTraitForm />,
          });
        },
      }
    ],
  };

  return {
    actionsI
  };
}
