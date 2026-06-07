"use client";

import { userContainer } from "@/core/infrastructure/container/organization/user-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (id: string) => userContainer.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire({ title: "¡Usuario eliminado!", icon: "success", timer: 1500 });
    },
    onError: (error: any) => {
      if ((error.response?.status || error.status) === 401) {
        router.push("/login");
        return;
      }
      Swal.fire({ title: "Error", text: "Error al eliminar usuario", icon: "error" });
    },
  });

  async function deleteConfirmed(id: string) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) return mutation.mutate(id);
  }

  return { deleteUserWithConfirmation: deleteConfirmed, isPending: mutation.isPending };
}