import { montserrat } from "@/lib/fonts/monserrat";

// src/components/atoms/table-body-cell.tsx
interface TableBodyCellProps {
  children: React.ReactNode;
  label: string; // Obligatorio para el responsive móvil
}

export default function TableBodyCell({ children, label }: TableBodyCellProps) {
  return (
    <td
      className={`px-6 line-clamp-1 whitespace-nowrap text-sm text-gray-700 block md:table-cell text-right md:text-left border-b border-gray-100 md:border-none py-3 before:content-[attr(data-label)] before:float-left before:font-semibold before:text-gray-500 md:before:hidden`}
      data-label={label}
    >
      {children}
    </td>
  );
}