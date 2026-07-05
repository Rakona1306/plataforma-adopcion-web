import FormContainer from "@/components/molecules/form-container";
import { RequestAdoptionResponse } from "../dto/request-adoption-response";
import useGetRequestStatus from "@/features/system/enums/request-status/hooks/use-get-request-status";
import { ReviewAdoptionDto } from "../dto/review-adoption.dto";
import Textarea from "@/components/atoms/text-area";
import { ChipField } from "@/components/atoms/chip-field";
import useReviewAdoption from "../hooks/use-reviw-adoption";
import { useModal } from "@/core/application/hooks/ui/useModal";
import ButtonUI from "@/components/atoms/button/button-ui";
import { SelectField } from "@/components/atoms/select-field";
import Select from "@/components/atoms/select";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { renderIntStatus } from "../utils/renderIntStatus";

interface Props {
    request: RequestAdoptionResponse;
}

export default function AdoptionReviewForm({ request }: Props) {
    const { handleCloseModal } = useModal() || {}
    const queryClient = useQueryClient()
    const { data: requestStatus } = useGetRequestStatus()
    const { reviewAdoption, isPending } = useReviewAdoption({
        onSuccess: () => {
            handleCloseModal && handleCloseModal()
            Swal.fire({
                icon: 'success',
                title: 'Solicitud actualizada',
                text: 'La solicitud de adopción ha sido actualizada correctamente.',
                confirmButtonText: 'Aceptar'
            })

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.BUSINESS.ADOPTION.REQUEST]
            })
        }
    })

    const initialValues: ReviewAdoptionDto = {
        status: renderIntStatus(request.status, requestStatus),
        reviewComment: request.reviewComment || ''
    }

    const handleSubmit = (values: ReviewAdoptionDto) => {
        reviewAdoption({ requestId: request.id, ...values })
    }

    return (
        <FormContainer
            initialValues={initialValues}
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {({ values, setFieldValue }) => (
                <>
                    <Select
                        label="Estado de solicitud"
                        options={requestStatus ? requestStatus.map((status) => ({
                            value: status.key,
                            label: status.value
                        })) : []}
                        value={values.status}
                        onChange={(value) => setFieldValue('status', parseInt(value.target.value))}
                        name="status"
                        defaultValue="React"
                    />
                    <Textarea name="reviewComment" label="Review Comment" required />

                    <ButtonUI type="submit" loading={isPending}>
                        Actualizar estado
                    </ButtonUI>
                </>
            )}
        </FormContainer>
    )
}