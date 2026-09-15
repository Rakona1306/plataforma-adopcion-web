import DisclosureFilterGroup from "@/components/ui/molecules/disclosures/disclosure-filter-group";
import { limaDistricts } from "@/core/shared/constants/distritcts";

interface Props<TKey extends string> {
  filterKey: TKey;
  selected: string[];
  onToggle: (key: TKey, value: string) => void;
}

export default function FilterDistrictDisclosure<TKey extends string>(
  props: Props<TKey>,
) {
  return (
    <DisclosureFilterGroup
      options={limaDistricts}
      title="Distrito"
      defaultExpanded={false}
      {...props}
    />
  );
}
