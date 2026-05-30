// src/components/molecules/table-actions.tsx
import { Menu, ActionIcon } from "@mantine/core";
import { BiDotsVerticalRounded } from "react-icons/bi";

export interface RowAction<T> {
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onClick: (row: T) => void;
}

interface TableActionsProps<T> {
  actions: RowAction<T>[];
  rowData: T;
}

export default function TableActions<T>({ actions, rowData }: TableActionsProps<T>) {
  if (!actions || actions.length === 0) return null;

  return (
    <Menu shadow="md" width={260} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" radius="xl" size="lg">
          <BiDotsVerticalRounded size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {actions.map((action, index) => (
          <Menu.Item
            key={index}
            leftSection={action.icon}
            color={action.color}
            onClick={() => action.onClick(rowData)}
          >
            {action.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}