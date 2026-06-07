"use client";

import { breedContainer } from "@/core/infrastructure/container/shelter/breed-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function useDeleteBreed() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (id: string) => breedContainer.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["breeds"],
      });

      Swal.fire({
        title: "¡Raza eliminada!",
        icon: "success",
        timer: 1500,
      });
    },

    onError: (error: any) => {
      const status = error.response?.status || error.status;

      if (status === 401) {
        router.push("/login");
        return;
      }

      Swal.fire({
        title: "Error",
        text: "Error al eliminar la raza",
        icon: "error",
      });
    },
  });

  async function deleteConfirmed(id: string) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      mutation.mutate(id);
    }
  }

  return {
    deleteBreedWithConfirmation: deleteConfirmed,
    isPending: mutation.isPending,
  };
}