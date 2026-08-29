import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import Swal from "sweetalert2";
import { requestAdoptionService } from "../../services/request-adoption.service";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { montserrat } from "@/lib/fonts/monserrat";
import { manrope } from "@/lib/fonts/manrope";
import { SwalDeleteConfirm } from "@/shared/swal/delete-confirm";
import { SwalSuccess } from "@/shared/swal/success";

export default function useDeleteRequestAdoption() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (id: number) => requestAdoptionService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.BUSINESS.REQUEST_ADOPTION.PAGINATE],
            });
            SwalSuccess({
                title: "Solicitud de adopción eliminada",
            })
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

    async function deleteConfirmed(id: number) {
        const result = await SwalDeleteConfirm(id, true)

        if (result.isConfirmed) {
            mutation.mutate(id);
        }
    }

    return {
        deleteConfirmed,
        isPending: mutation.isPending,
    };
}