'use client'
import { manrope } from "@/lib/fonts/manrope";
import { montserrat } from "@/lib/fonts/monserrat";
import Swal from "sweetalert2";

const WARNING_URL = '/icons/warning.svg'

export const SwalDeleteConfirm = async (
    id: number | string,
    withCode?: boolean
) => {
    return await Swal.fire({
        title: `<h2 class="text-lg md:text-2xl font-extrabold text-slate-700 ${montserrat.className}">¿Estás seguro de eliminar ${withCode ? `N-0${id}` : id}?</h2>`,
        // text: `Esta acción no se puede deshacer.`,
        html: `<p class="text-sm md:text-lg ${manrope.className}">Esta acción no se puede deshacer.</p>`,
        icon: "warning",
        customClass: {
            icon: 'border-none!',
            popup: 'rounded-2xl! max-w-2xl! w-full!',
            confirmButton: 'bg-red-600! hover:bg-red-700! text-white! font-bold! py-2! px-4! rounded-lg!',
            cancelButton: 'bg-gray-300! hover:bg-gray-400! text-gray-800! font-bold! py-2! px-4! rounded-lg!',
        },
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminar",
        iconHtml: `<img src="${WARNING_URL}" alt="Warning" class="w-16 md:w-20 h-16 md:h-20" />`,
    });
}