// src/components/atoms/table-pagination.tsx
import { Pagination } from "@mantine/core";

interface TablePaginationProps {
  total: number;
  value: number;
  onChange: (page: number) => void;
}

export const TablePagination = ({ total, value, onChange }: TablePaginationProps) => (
  <div className="flex justify-center md:justify-end mt-4 p-2">
    <Pagination 
      total={Math.ceil(total / 10)} // Ajusta según tu pageSize
      value={value} 
      onChange={onChange} 
      color="blue" 
      size="sm" 
    />
  </div>
);