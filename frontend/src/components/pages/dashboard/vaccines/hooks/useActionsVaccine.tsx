import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { CreateVaccineForm } from "../organism";


export default function useActionsVaccine() {
  const { handleOpenModal } = useModal() || {};

  const actionsI: IActionButtons = {
    buttons: [
      {
        label: "Crear",
        onClick: () => {
          handleOpenModal?.({
            header: "Crear nueva vacuna",
            content: <CreateVaccineForm />,
          });
        },
      }
    ],
  };

  return {
    actionsI
  };
}
