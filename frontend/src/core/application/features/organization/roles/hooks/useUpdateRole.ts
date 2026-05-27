import { useModal } from "@/core/application/hooks/ui/useModal";
import { roleContainer } from "@/core/infrastructure/container/organization/role-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleUpdateDto } from "../dtos/role-update-dto";
import Swal from "sweetalert2";

export function useUpdateRole() {
  const queryClient = useQueryClient();
  const { handleCloseModal } = useModal() || {};

  const mutation = useMutation({
    // Recibimos un objeto con id y dto
    mutationFn: ({ id, dto }: { id: string; dto: RoleUpdateDto }) =>
      roleContainer.updateRole(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      handleCloseModal?.();
      Swal.fire({
        title: "¡Role actualizado!",
        text: "El rol ha sido actualizado con éxito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: true,
      });
    },
    onError: (error) => {
      console.error("Error al actualizar el rol:", error);
    },
  });

  return {
    update: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error
  };
}
