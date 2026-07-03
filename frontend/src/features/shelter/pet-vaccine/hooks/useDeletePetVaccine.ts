import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { petVaccineService } from "../services/pet-vaccine.service";
import Swal from "sweetalert2";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export default function useDeletePetVaccine() {

    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (id: string) => petVaccineService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SHELTER.PET_VACCINE],
            });

            Swal.fire({
                title: "¡Relacion Mascota Vacuna eliminada!",
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
                text: "Error al eliminar la mascota",
                icon: "error",
            });
        },
    });

    async function deleteConfirmed(id: string) {
        const result = await Swal.fire({
            title: `¿Estás seguro de eliminar la relacion?`,
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
        deleteConfirmed,
        isPending: mutation.isPending,
    };
}