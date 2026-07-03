/* eslint-disable @typescript-eslint/no-explicit-any */
// src/presentation/hooks/organization/useDeleteRole.ts
"use client";

import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { roleService } from "../services/role.service";

export function useDeleteRole() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    // Recibimos el ID como parámetro
    mutationFn: (id: string) => roleService.delete(id),
    onSuccess: () => {
      // Al igual que al crear, invalidamos la caché para refrescar la lista
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION.ROLE] });
      Swal.fire({
        title: "¡Rol eliminado!",
        text: "El rol ha sido eliminado con éxito.",
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

      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un error al eliminar el rol.",
        icon: "error",
        showConfirmButton: true,
      });
      console.error("Error al eliminar el rol:", error);
    },
  });

  async function deleteConfirmed(id: string) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      return await mutation.mutate(id);
    }
  }

  return {
    deleteRole: mutation.mutate,
    deleteRoleWithConfirmation: deleteConfirmed,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
