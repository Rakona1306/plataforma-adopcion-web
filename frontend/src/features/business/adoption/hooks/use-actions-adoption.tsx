import { IActionButtons } from "@/app/dashboard/_components/organism/action-buttons"
import { useModal } from "@/core/application/hooks/ui/useModal"
import CreateRequestAdoptionForm from "../../request-adoptions/components/create-request-adoption-form"

export default function useAdoptionActions() {

    const { handleOpenModal } = useModal() || {}

    const actionsI: IActionButtons = {
        buttons: [
            {
                label: 'Crear Solicitud',
                onClick: () => {
                    handleOpenModal?.({
                        header: 'Crear Solicitud de Adopción',
                        content: <CreateRequestAdoptionForm />
                    })
                }
            }
        ]
    }

    return {
        actionsI
    }
}