import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { adoptionService } from "../services/adoption.service";
import { ReviewReqAdoptionDto } from "../../request-adoptions/dto/dashboard/review-req-adoption";

export default function useReviewAdoption(props: UseMutationOptions<void, unknown, ReviewReqAdoptionDto & { requestId: string }>) {
    const { mutate: reviewAdoption, isPending, isError } = useMutation({
        ...props,
        mutationFn: ({ requestId, ...dto }: ReviewReqAdoptionDto & { requestId: string }) => adoptionService.reviewAdoptionRequest(requestId, dto)
    })

    return {
        reviewAdoption,
        isPending,
        isError
    }
}