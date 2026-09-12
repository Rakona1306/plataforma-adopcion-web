import { SearchIcon } from "lucide-react";
import DefaultInput from "../../atoms/forms/default-input";
import SelectInput from "../../atoms/forms/select-input";
import ButtonUI from "../../atoms/button/button-ui";

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
    <div className="w-full py-5 px-4 bg-white border-2 border-slate-200 rounded-xl shadow-sm shadow-slate-500 flex gap-4">
      {search && <Search {...search} />}
      {orderBy && <OrderBy {...orderBy} />}
      {filter && <Filter {...filter} />}
      {!!onClearAll && <ButtonUI>Limpiar</ButtonUI>}
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
  return <SelectInput defaultSchema={props} />;
}

function Filter(props: FilterSchema) {
  return <>{props}</>;
}
