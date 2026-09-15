import DisclosureFilterRadioGroup from "@/components/ui/molecules/disclosures/disclosure-filter-radio-group";

interface Props<TKey extends string> {
  filterKey: TKey;
  selected: string;
  onSelect: (key: TKey, value: string) => void;
  allowClear?: boolean;
}

export default function FilterIsBlockedDisclosure<TKey extends string>(
  props: Props<TKey>,
) {
  return (
    <DisclosureFilterRadioGroup
      options={[
        { value: "", label: "Todos" },
        { value: "false", label: "Activo" },
        { value: "true", label: "Bloqueado" },
      ]}
      title="Estado"
      {...props}
    />
  );
}
