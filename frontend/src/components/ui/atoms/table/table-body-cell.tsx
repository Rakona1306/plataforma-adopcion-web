// src/components/atoms/table-body-cell.tsx

import { cn } from "@/lib/utils";

interface TableBodyCellProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reemplaza al <td> nativo. En desktop se comporta como una celda de
 * grid; en mobile muestra el label a la izquierda y el valor a la
 * derecha, simulando el layout de "card" que tenía la tabla original.
 */
export default function TableBodyCell({
  label,
  children,
  className,
}: TableBodyCellProps) {
  return (
    <div
      role="cell"
      className={cn(
        "min-w-0 w-full flex items-center justify-center gap-4 px-0 py-1.5 lg:px-4 lg:py-4 text-sm text-gray-700",
        className,
      )}
    >
      <span className="font-semibold text-gray-500 lg:hidden shrink-0">
        {label}
      </span>
      <span
        className="min-w-0 text-right lg:text-left w-full lg:w-auto truncate"
        title={typeof children === "string" ? children : undefined}
      >
        {children}
      </span>
    </div>
  );
}
