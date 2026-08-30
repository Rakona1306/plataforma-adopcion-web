import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { adoptionService } from "../services/adoption.service";
import { UpdateAdoptionDto } from "../dto/dashboard/update-adoption";

export default function useUpdateAdoption(
  props: UseMutationOptions<void, unknown, UpdateAdoptionDto>,
) {
  const {
    mutate: updateAdoption,
    isPending,
    isError,
  } = useMutation({
    ...props,
    mutationFn: (dto: UpdateAdoptionDto) => adoptionService.update(dto),
  });

  return {
    updateAdoption,
    isPending,
    isError,
  };
}
