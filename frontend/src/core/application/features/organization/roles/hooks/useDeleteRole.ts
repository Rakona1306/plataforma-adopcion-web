// src/presentation/hooks/organization/useDeleteRole.ts
"use client";

import { roleContainer } from "@/core/infrastructure/container/organization/role-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export function useDeleteRole() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // Recibimos el ID como parámetro
    mutationFn: (id: string) => roleContainer.deleteRole(id),
    onSuccess: () => {
      // Al igual que al crear, invalidamos la caché para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      Swal.fire({
        title: "¡Rol eliminado!",
        text: "El rol ha sido eliminado con éxito.",
        icon: "success",
        timer: 1500,
        showConfirmButton: true,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un error al eliminar el rol.",
        icon: "error",
        showConfirmButton: true,
      });
      console.error("Error al eliminar el rol:", error);
    }
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
    error: mutation.error
  };
}