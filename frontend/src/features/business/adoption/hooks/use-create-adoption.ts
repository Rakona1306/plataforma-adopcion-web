import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { adoptionService } from "../services/adoption.service";
import { CreateReqAdoptionDetail } from "../dto/create-adoption.dto";

export default function useCreateAdoption(props: UseMutationOptions<void, unknown, CreateReqAdoptionDetail>) {
    const { mutate: createAdoption, isPending, isError } = useMutation({
        ...props,
        mutationFn: (dto: CreateReqAdoptionDetail) => adoptionService.requestAdoption(dto)
    })

    return {
        createAdoption,
        isPending,
        isError
    }
}