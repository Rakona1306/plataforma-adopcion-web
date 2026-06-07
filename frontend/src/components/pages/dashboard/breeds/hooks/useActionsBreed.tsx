import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { CreateBreedForm } from "../organism";

export default function useActionsBreed() {
  const { handleOpenModal } = useModal() || {};

  const actionsI: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        onClick: () => {
          handleOpenModal?.({
            header: "Crear nueva raza",
            content: <CreateBreedForm />,
          });
        },
      }
    ],
  };

  return {
    actionsI
  };
}