// src/components/organisms/custom-table.tsx
import { Skeleton } from "@mantine/core";
import { cn } from "@/lib/utils";
import TableActions, {
  RowAction,
} from "@/app/dashboard/_components/molecules/table-actions";
import { TablePagination } from "@/app/dashboard/_components/atoms/table-pagination";
import TableGridRow from "@/components/ui/atoms/table/table-grid-row";
import TableMessageRow from "@/components/ui/atoms/table/table-message-row";
import TableHeaderCell from "@/components/ui/atoms/table/table-header-cell";
import TableBodyCell from "@/components/ui/atoms/table/table-body-cell";

export interface TableColumn<T> {
  key: string;
  label: string;
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

  // 🎨 Props de personalización de estilos (Escalabilidad)
  containerClassName?: string;
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  trClassName?: string;
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
  onPageChange,
  containerClassName,
  tableClassName,
  theadClassName,
  tbodyClassName,
  trClassName,
}: CustomTableProps<T>) {
  const hasActions = !!(actions && actions.length > 0);

  return (
    <div className={cn("w-full overflow-hidden", containerClassName)}>
      <div className="overflow-x-auto p-2">
        {/* Contenedor "table" */}
        <div role="table" className={cn("w-full", tableClassName)}>
          {/* ENCABEZADO ("thead") */}
          <div
            role="rowgroup"
            className={cn(
              "hidden lg:block bg-primary border border-gray-200 shadow-xl rounded-xl",
              theadClassName,
            )}
          >
            <TableGridRow
              columnsCount={hasActions ? columns.length + 1 : columns.length}
              hasActions={hasActions}
            >
              {columns.map((col) => (
                <TableHeaderCell key={col.key} label={col.label} />
              ))}
              {hasActions && <TableHeaderCell label="Acciones" />}
            </TableGridRow>
          </div>

          {/* CUERPO ("tbody") */}
          <div
            role="rowgroup"
            className={cn(
              "flex flex-col lg:block gap-4 lg:gap-0 divide-y-0 lg:divide-y lg:divide-gray-100 mt-4 lg:mt-5 shadow-sm shadow-slate-500 border-2 border-slate-200 bg-white rounded-xl ",
              tbodyClassName,
            )}
          >
            {isError ? (
              <TableMessageRow className={cn("text-red-500", trClassName)}>
                Error al cargar datos.
              </TableMessageRow>
            ) : isLoading ? (
              <TableGridRow
                columnsCount={hasActions ? columns.length + 1 : columns.length}
                hasActions={hasActions}
                className={trClassName}
              >
                {columns.map((col) => (
                  <div
                    role="cell"
                    key={col.key}
                    className="lg:p-12 text-center text-gray-400"
                  >
                    <Skeleton height={40} width={"100%"} />
                  </div>
                ))}
                {hasActions && (
                  <div
                    role="cell"
                    className="p-4 lg:p-12 text-center text-gray-400"
                  >
                    <Skeleton height={40} width={"100%"} />
                  </div>
                )}
              </TableGridRow>
            ) : data.length === 0 ? (
              <TableMessageRow className={trClassName}>
                Sin registros.
              </TableMessageRow>
            ) : (
              data.map((row) => (
                <TableGridRow
                  key={keyExtractor(row)}
                  columnsCount={
                    hasActions ? columns.length + 1 : columns.length
                  }
                  hasActions={hasActions}
                  className={cn(
                    " transition-colors duration-300 p-4 lg:p-0 border border-gray-200 lg:border-none rounded-xl lg:rounded-xl bg-white relative cursor-default",
                    trClassName,
                  )}
                >
                  {columns.map((col) => (
                    <TableBodyCell key={col.key} label={col.label}>
                      {col.render
                        ? col.render(row)
                        : (row as any)[col.key] !== "" &&
                            (row as any)[col.key] !== null
                          ? (row as any)[col.key]
                          : "N/A"}
                    </TableBodyCell>
                  ))}

                  {/* Acciones de la fila */}
                  {hasActions && (
                    <div
                      role="cell"
                      className="flex justify-end lg:justify-center items-center px-0 lg:px-6 py-2 lg:py-4 text-sm absolute top-2 right-2 lg:static"
                    >
                      <TableActions actions={actions!} rowData={row} />
                    </div>
                  )}
                </TableGridRow>
              ))
            )}
          </div>
        </div>
      </div>

      <TablePagination
        total={totalItems}
        value={page}
        onChange={onPageChange}
      />
    </div>
  );
}
