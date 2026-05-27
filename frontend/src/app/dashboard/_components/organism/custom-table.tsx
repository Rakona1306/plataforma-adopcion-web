/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/organisms/custom-table.tsx
import TableHeaderCell from "../atoms/table-header-cell";
import TableBodyCell from "../atoms/table-body-cell";
import TableActions, { RowAction } from "../molecules/table-actions";
import { montserrat } from "@/lib/fonts/monserrat";
import { TableSkeleton } from "../atoms/table-skeleton";
import { TablePagination } from "../atoms/table-pagination";
import { Skeleton } from "@mantine/core";

export interface TableColumn<T> {
  key: string;
  label: string;
  // render es opcional. Si no viene, renderiza el texto plano de la propiedad.
  render?: (row: T) => React.ReactNode;
}

interface CustomTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: RowAction<T>[];
  keyExtractor: (row: T) => string | number;
  isLoading?: boolean;
  isError?: boolean;
  page?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

export default function CustomTable<T>({ 
  columns, 
  data, 
  actions, 
  keyExtractor, 
  isLoading, 
  isError, 
  page, 
  totalItems, 
  onPageChange 
}: CustomTableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full block md:table">

          {/* ENCABEZADO: Se oculta por completo en móviles */}
          <thead className="hidden md:table-header-group">
            <tr>
              {columns.map((col) => (
                <TableHeaderCell key={col.key} label={col.label} />
              ))}
              {actions && actions.length > 0 && (
                <th className={`px-6 py-4 bg-primary text-right w-16 text-white font-semibold ${montserrat.className}`} >
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          {/* CUERPO: Se transforma en bloques apilados en móvil */}
          <tbody className="block md:table-row-group divide-y divide-gray-100">
            {isError ? (
              <tr><td colSpan={columns.length} className="p-10 text-center text-red-500">Error al cargar datos.</td></tr>
            ) : isLoading ? (
              <tr>
                {
                  columns.map((col) => (
                    <td key={col.key} className="p-12 text-center text-gray-400">
                      <Skeleton height={40} width={"100%"} />
                    </td>
                  ))
                }
                <td><Skeleton height={40} width={"100%"} /></td>
              </tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length} className="p-12 text-center text-gray-400">Sin registros.</td></tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="block md:table-row md:hover:bg-gray-50/50 transition-colors p-4 md:p-0 mb-4 md:mb-0 border border-gray-200 md:border-none rounded-xl md:rounded-none bg-white relative"
                >
                  {columns.map((col) => (
                    <TableBodyCell key={col.key} label={col.label}>
                      {col.render ? col.render(row) : (row as any)[col.key] !== "" && (row as any)[col.key] !== null ? (row as any)[col.key] : "N/A" }
                    </TableBodyCell>
                  ))}

                  {/* Acciones de la fila */}
                  {actions && actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right block md:table-cell border-none pt-4 md:pt-4">
                      {/* En móvil posicionamos el menú flotante arriba a la derecha */}
                      <div className="absolute top-2 right-2 md:relative md:top-0 md:right-0">
                        <TableActions actions={actions} rowData={row} />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {totalItems && page && onPageChange && (
        <TablePagination total={totalItems} value={page} onChange={onPageChange} />
      )}
    </div>
  );
}