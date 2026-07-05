import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ReviewAdoptionDto } from "../dto/review-adoption.dto";
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