import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ReviewAdoptionDto } from "../../request-adoptions/dto/dashboard/review-req-adoption";
import { adoptionService } from "../services/adoption.service";

export default function useReviewAdoption(props: UseMutationOptions<void, unknown, ReviewAdoptionDto & { requestId: string }>) {
    const { mutate: reviewAdoption, isPending, isError } = useMutation({
        ...props,
        mutationFn: ({ requestId, ...dto }: ReviewAdoptionDto & { requestId: string }) => adoptionService.reviewAdoptionRequest(requestId, dto)
    })

    return {
        reviewAdoption,
        isPending,
        isError
    }
}