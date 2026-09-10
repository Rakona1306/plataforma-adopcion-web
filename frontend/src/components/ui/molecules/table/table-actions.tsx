// src/components/molecules/table-actions.tsx
import { useWindowWidth } from "@/hooks/use-window-width";
import { Menu, ActionIcon } from "@mantine/core";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ButtonUI from "../../atoms/button/button-ui";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useId } from "react";

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

export default function TableActions<T>({
  actions,
  rowData,
}: TableActionsProps<T>) {
  const { isMobile } = useWindowWidth();
  const { handleOpenModal } = useModal() || {};

  if (!actions || actions.length === 0) return null;

  if (isMobile) {
    return (
      <ButtonUI
        onClick={() => {
          if (handleOpenModal) {
            handleOpenModal({
              header: "Escoja una opcion",
              content: (
                <ModalTableActions actions={actions} rowData={rowData} />
              ),
            });
          }
        }}
      >
        Acciones
      </ButtonUI>
    );
  }

  return (
    <Menu shadow="md" width={260} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" radius="xl" size="lg">
          <BiDotsVerticalRounded size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Acciones</Menu.Label>
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

function ModalTableActions<T>({ actions, rowData }: TableActionsProps<T>) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {actions.map((action, index) => {
        return (
          <ButtonUI
            color={action.color}
            key={`${id}:${index}`}
            onClick={() => action.onClick(rowData)}
          >
            {action.icon}
            {action.label}
          </ButtonUI>
        );
      })}
    </div>
  );
}
