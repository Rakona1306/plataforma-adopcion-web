import { montserrat } from "@/lib/fonts/monserrat";

interface TableHeaderCellProps {
  label: string;
}

export default function TableHeaderCell({ label }: TableHeaderCellProps) {
  return (
    <th className={`${montserrat.className} px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider bg-primary`}>
      {label}
    </th>
  );
}