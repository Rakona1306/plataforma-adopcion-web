import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";

// Definimos los tipos de variantes visuales que soportará nuestro botón
export type ButtonIntent = "primary" | "secondary" | "cancel" | "normal";

interface ButtonUIProps extends ButtonProps {
    children: ReactNode;
    intent?: ButtonIntent; // Modos solicitados
    rootClassName?: string;
    labelClassName?: string
    [key: string]: any;
}

export default function ButtonUI({
    children,
    intent = "primary", // Modo por defecto
    rootClassName,
    labelClassName,
    disabled,
    ...props
}: ButtonUIProps) {

    // Diccionario de estilos limpios usando clases nativas de Tailwind
    const intentStyles: Record<ButtonIntent, string> = {
        primary: "bg-primary! hover:bg-secondary! text-white! border-none shadow-sm",
        secondary: "bg-slate-100! hover:bg-slate-200! text-slate-700! border! border-slate-200/60! shadow-sm!",
        cancel: "bg-red-500! hover:bg-red-600! text-white! border! border-red-200! shadow-sm!",
        normal: "bg-white! hover:bg-gray-200! text-slate-800! border-2! border-gray-400! shadow-sm!"
    };

    // Estilos obligatorios para cuando el botón se encuentre deshabilitado (ya sea por prop u loading)
    const disabledStyles = "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-75 pointer-events-none shadow-none";

    return (
        <Button
            {...props}
            disabled={disabled}
            styles={{
                root: {
                    overflow: "inherit", // 👈 Forzado global para que siempre tenga este comportamiento
                },
            }}
            classNames={{
                root: cn(
                    // 1. Estilos estructurales y estables comunes a todos los botones
                    "font-medium! px-6! py-3! h-auto! rounded-md! relative! transition-all! duration-200! flex! items-center! justify-center! gap-2! active:scale-[0.98]!",
                    // 2. Aplicación dinámica del modo o el estado deshabilitado
                    disabled || props.loading ? disabledStyles : intentStyles[intent],
                    // 3. Clases externas inyectadas al vuelo que pueden pisar lo anterior
                    rootClassName
                ),
                label: cn(
                    'flex gap-2 items-center',
                    labelClassName
                )
            }}
        >
            {children}
        </Button>
    );
}