import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { CreateSpecieForm } from "../organism";

export default function useActionsSpecie() {
  const { handleOpenModal } = useModal() || {};

  const actionsI: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        onClick: () => {
          handleOpenModal?.({
            header: "Crear nueva especie",
            content: <CreateSpecieForm />,
          });
        },
      }
    ],
  };

  return {
    actionsI
  };
}
