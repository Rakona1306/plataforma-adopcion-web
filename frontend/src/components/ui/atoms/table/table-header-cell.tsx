// src/components/atoms/table-header-cell.tsx

import { montserrat } from "@/lib/fonts/monserrat";
import { cn } from "@/lib/utils";

interface TableHeaderCellProps {
  label: string;
  className?: string;
}

/**
 * Reemplaza al <th> nativo. Al ser un div, admite cualquier estilo
 * (flex, gradientes, iconos, etc.) sin las restricciones de las celdas
 * de tabla reales.
 *
 * min-w-0 + w-full: hace que la celda respete el ancho que le da el
 * grid (todas las columnas quedan del mismo tamaño) en vez de crecer
 * según su contenido.
 * truncate en el span interno: si el contenedor queda chico, el texto
 * se corta con "..." en lugar de desbordar o hacer wrap.
 */
export default function TableHeaderCell({
  label,
  className,
}: TableHeaderCellProps) {
  return (
    <div
      role="columnheader"
      className={cn(
        `min-w-0 w-full px-4 py-6 flex items-center justify-center text-sm font-extrabold text-white ${montserrat.className}`,
        className,
      )}
    >
      <span className="truncate" title={label}>
        {label}
      </span>
    </div>
  );
}
