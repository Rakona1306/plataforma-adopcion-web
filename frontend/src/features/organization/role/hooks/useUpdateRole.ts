/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleUpdateDto } from "../dtos/role-update-dto";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { roleService } from "../services/role.service";

export function useUpdateRole() {
  const queryClient = useQueryClient();
  const { handleCloseModal } = useModal() || {};
  const router = useRouter();

  const mutation = useMutation({
    // Recibimos un objeto con id y dto
    mutationFn: ({ id, dto }: { id: string; dto: RoleUpdateDto }) =>
      roleService.update(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION.ROLE] });
      handleCloseModal?.();
      Swal.fire({
        title: "¡Role actualizado!",
        text: "El rol ha sido actualizado con éxito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: true,
      });
    },
    onError: (error: any) => {
      const status = error.response?.status || error.status;
      if (status === 401) {
        Swal.fire({
          title: "Sesión expirada",
          text: "Tu sesión ha caducado. Serás redirigido al login.",
          icon: "warning",
          confirmButtonText: "Ir al Login",
        }).then(() => {
          // 2. Redirigimos al login
          router.push("/login");
        });
        return;
      }
    },
  });

  return {
    update: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
