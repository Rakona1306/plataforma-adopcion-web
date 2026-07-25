import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { requestAdoptionService } from "../../services/request-adoption.service";
import { CreateReqAdoption } from "../../dto/web/create-request-adoption.dto";

export default function useCreateRequestAdoption(props: UseMutationOptions<void, unknown, CreateReqAdoption>) {
    const { mutate: createAdoption, isPending, isError } = useMutation({
        ...props,
        mutationFn: (dto: CreateReqAdoption) => requestAdoptionService.create(dto),
    })

    return {
        createAdoption,
        isPending,
        isError
    }
}