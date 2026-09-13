import { FilterIcon, SearchIcon, Trash } from "lucide-react";
import DefaultInput from "../../atoms/forms/default-input";
import SelectInput from "../../atoms/forms/select-input";
import ButtonUI from "../../atoms/button/button-ui";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";

interface Props {
  orderBy?: OrderBySchema;
  search?: SearchSchema;
  filter?: FilterSchema;
  onClearAll?: () => void;
}

interface FilterSchema {
  drawer: React.ReactNode;
  title: string;
}

interface SearchSchema {
  placeholder?: string;
  onSearch: (value: string) => void;
  label?: string;
  name?: string;
  value?: string;
}

interface OrderBySchema {
  options: Array<{ label: string; value: string }>;
  label?: string;
  onSelected: (value: string) => void;
  defaultValue?: string;
}

export default function FilterSection({
  onClearAll,
  search,
  orderBy,
  filter,
}: Props) {
  return (
    <div className="w-full py-5 px-4 bg-white border-2 border-slate-200 rounded-xl shadow-sm shadow-slate-500 flex gap-4 items-stretch justify-stretch flex-row">
      {search && <Search {...search} />}
      {orderBy && <OrderBy {...orderBy} />}
      {filter && <Filter {...filter} />}
      {!!onClearAll && <ClearAll onClearAll={onClearAll} />}
    </div>
  );
}

function Search(props: SearchSchema) {
  return (
    <DefaultInput
      leftIcon={<SearchIcon size={19} />}
      onChange={(e) => props.onSearch(e.currentTarget.value)}
      {...props}
    />
  );
}

function OrderBy(props: OrderBySchema) {
  return (
    <div className="max-w-2xs w-full">
      <SelectInput defaultSchema={props} />
    </div>
  );
}

function Filter({ drawer, title }: FilterSchema) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="h-auto">
      <div className="flex flex-col gap-2 h-full">
        <h2 className="text-sm font-semibold text-slate-700 text-start">
          Filtros
        </h2>
        <ButtonUI rootClassName="py-2! h-full!" onClick={open}>
          <FilterIcon size={17} />
          <span className="text-sm">Ingresa tus filtros</span>
        </ButtonUI>
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        title={title}
        position="right"
        offset={8}
        radius="md"
      >
        {drawer}
      </Drawer>
    </div>
  );
}

function ClearAll({ onClearAll }: { onClearAll: () => void }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-slate-700 text-start">
        Limpiar
      </h2>
      <ButtonUI
        rootClassName="py-2! h-full! bg-red-600! hover:bg-red-700!"
        onClick={onClearAll}
      >
        <Trash size={25} />
      </ButtonUI>
    </div>
  );
}
