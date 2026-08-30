import FormContainer from "@/components/molecules/form-container";
import useGetRequestStatus from "@/features/system/enums/request-status/hooks/use-get-request-status";
import Textarea from "@/components/atoms/text-area";
import { useModal } from "@/core/application/hooks/ui/useModal";
import ButtonUI from "@/components/atoms/button/button-ui";
import Select from "@/components/atoms/select";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { renderIntStatus } from "../../adoption/utils/renderIntStatus";
import { RequestAdoptionResponse } from "../dto/dashboard/request-adoption";
import useReviewRequestAdoption from "../hooks/dashboard/use-review-request-adoption";
import {
  ReviewReqAdoptionDto,
  ReviewReqAdoptionSchema,
} from "../dto/dashboard/review-req-adoption";
import { Skeleton } from "@mantine/core";
import { useState } from "react";
import { HttpError } from "@/core/shared/errors/http-error";

interface Props {
  request: RequestAdoptionResponse;
}

export default function AdoptionReviewForm({ request }: Props) {
  const { handleCloseModal } = useModal() || {};
  const queryClient = useQueryClient();
  const { data: requestStatus, isLoading, isFetching } = useGetRequestStatus();
  const { mutate: reviewAdoption, isPending } = useReviewRequestAdoption();
  const [error, setError] = useState<string | null>(null);

  const initialValues: ReviewReqAdoptionDto = {
    id: request.id,
    status: renderIntStatus(request.status, requestStatus),
    reviewComment: request.reviewComment || "",
  };

  const handleSubmit = (values: ReviewReqAdoptionDto) => {
    reviewAdoption(
      { requestId: request.id, dto: values },
      {
        onSuccess: () => {
          handleCloseModal && handleCloseModal();
          Swal.fire({
            icon: "success",
            title: "Solicitud actualizada",
            text: "La solicitud de adopción ha sido actualizada correctamente.",
            confirmButtonText: "Aceptar",
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.BUSINESS.REQUEST_ADOPTION.PAGINATE],
          });
        },
        onError: (error: any) => {
          if (error instanceof HttpError) {
            setError(
              error.message ||
                "Ocurrió un error al actualizar la solicitud de adopción.",
            );
          }
        },
      },
    );
  };

  return (
    <FormContainer
      initialValues={initialValues}
      onSubmit={handleSubmit}
      className="space-y-5"
      validationSchema={ReviewReqAdoptionSchema}
    >
      {({ setFieldValue }) => (
        <>
          {error && <div className="text-red-500">{error}</div>}
          {isLoading || isFetching ? (
            <Skeleton w={"100%"} h={"60px"} />
          ) : (
            <Select
              label="Estado de solicitud"
              options={
                requestStatus
                  ? requestStatus.map((status) => ({
                      value: status.key,
                      label: status.value,
                    }))
                  : []
              }
              onChange={(value) =>
                setFieldValue("status", parseInt(value.target.value))
              }
              name="status"
              value={renderIntStatus(request.status, requestStatus)}
              defaultValue={renderIntStatus(request.status, requestStatus)}
            />
          )}
          <Textarea name="reviewComment" label="Review Comment" required />

          <ButtonUI type="submit" loading={isPending} fullWidth>
            Actualizar estado
          </ButtonUI>
        </>
      )}
    </FormContainer>
  );
}
