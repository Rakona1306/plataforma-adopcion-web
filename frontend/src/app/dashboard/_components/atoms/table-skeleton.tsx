// src/components/atoms/table-skeleton.tsx
import { Skeleton } from "@mantine/core";

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i} className="block md:table-row p-4 border-b">
        <td className="w-full block md:table-cell py-3">
          <Skeleton height={20} radius="sm" />
        </td>
      </tr>
    ))}
  </>
);