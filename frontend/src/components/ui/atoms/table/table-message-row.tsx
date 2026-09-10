// src/components/atoms/table-message-row.tsx

import { cn } from "@/lib/utils";

interface TableMessageRowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Fila de una sola celda que ocupa todo el ancho, usada para
 * comunicar estados (error, sin registros). Equivale a un
 * <td colSpan={totalColumns}> pero sin necesitar <table>.
 */
export default function TableMessageRow({
  children,
  className,
}: TableMessageRowProps) {
  return (
    <div role="row">
      <div
        role="cell"
        className={cn("p-12 text-center text-gray-400", className)}
      >
        {children}
      </div>
    </div>
  );
}
