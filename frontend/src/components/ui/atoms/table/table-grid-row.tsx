// src/components/atoms/table-grid-row.tsx

import { cn } from "@/lib/utils";

interface TableGridRowProps {
  /** Cantidad de columnas de datos (sin contar acciones) */
  columnsCount: number;
  /** Si la fila debe reservar una columna extra para acciones */
  hasActions?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Reemplaza al <tr> nativo. Usa CSS Grid en desktop (misma cantidad de
 * columnas que el header) y flex-column en mobile para el efecto "card".
 * Todas las filas (header y body) comparten esta misma plantilla de
 * columnas, por lo que quedan alineadas entre sí.
 */
export default function TableGridRow({
  columnsCount,
  hasActions,
  className,
  children,
}: TableGridRowProps) {
  const gridTemplateColumns = `repeat(${columnsCount}, minmax(0, 1fr))${
    hasActions ? " max-content" : ""
  }`;

  return (
    <div
      role="row"
      className={cn(
        "flex flex-col lg:grid lg:items-center gap-2 lg:gap-0",
        className,
      )}
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
}
