'use client'
import { montserrat } from "@/lib/fonts/monserrat";
import Swal from "sweetalert2";

interface SwalSuccessProps {
    title?: string;
    paragraph?: string;
    timer?: number;
}

export const SwalSuccess = ({ title, timer = 1500, paragraph }: SwalSuccessProps) => {
    Swal.fire({
        title: title && `<h2 class="text-lg md:text-2xl font-extrabold text-slate-700 ${montserrat.className}">${title}</h2>`,
        icon: "success",
        customClass: {
            icon: 'border-none!',
            popup: 'rounded-2xl! max-w-2xl! w-full!',
            confirmButton: 'bg-green-600! hover:bg-green-700! text-white! font-bold! py-2! px-4! rounded-lg!',
            cancelButton: 'bg-gray-300! hover:bg-gray-400! text-gray-800! font-bold! py-2! px-4! rounded-lg!',
        },
        timer: timer,
        iconHtml: `<img src="/icons/success.svg" alt="Success" class="w-16 md:w-20 h-16 md:h-20" />`,
        html: paragraph && `<p>${paragraph}</p>`,
    });
}