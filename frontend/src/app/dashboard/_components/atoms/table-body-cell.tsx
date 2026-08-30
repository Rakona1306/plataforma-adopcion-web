import { montserrat } from "@/lib/fonts/monserrat";

// src/components/atoms/table-body-cell.tsx
interface TableBodyCellProps {
  children: React.ReactNode;
  label: string; // Obligatorio para el responsive móvil
}

export default function TableBodyCell({ children, label }: TableBodyCellProps) {
  return (
    <td
      className={`px-6 line-clamp-1 font-medium whitespace-nowrap text-sm text-gray-800 block lg:table-cell text-right lg:text-center border-b border-gray-100 lg:border-none py-3 before:content-[attr(data-label)] before:float-left before:font-semibold before:text-gray-500 lg:before:hidden align-middle mx-auto`}
      data-label={label}
    >
      <div className="flex lg:justify-center justify-end">
        {children}
      </div>
    </td>
  );
}