import DisclosureFilterRadioGroup from "@/components/ui/molecules/disclosures/disclosure-filter-radio-group";

interface Props<TKey extends string> {
  filterKey: TKey;
  selected: string;
  onSelect: (key: TKey, value: string) => void;
  allowClear?: boolean;
}

export default function FilterToDashboardDisclosure<TKey extends string>(
  props: Props<TKey>,
) {
  return (
    <DisclosureFilterRadioGroup
      options={[
        { value: "", label: "Todos" },
        { value: "true", label: "Si" },
        { value: "false", label: "No" },
      ]}
      title="Ingreso al Dashboard?"
      {...props}
    />
  );
}
