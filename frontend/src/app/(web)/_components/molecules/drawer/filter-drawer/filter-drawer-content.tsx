import DisclosureFilterBreed from "@/features/shelter/breed/components/disclosure-filter-breed";
import DisclosureFilterSpecie from "@/features/shelter/specie/components/disclosure-filter-specie";
import DisclosureFilterGender from "@/features/system/enums/pet-genders/components/disclosure-filter-gender";
import DisclosureFilterSize from "@/features/system/enums/pet-sizes/components/disclosure-filter-sizes";
import { Flex } from "@mantine/core";
import DisclosureFilterAge from "./disclosure-filter-age";

export function FilterDrawerContent() {
    return (
        <Flex w={'100%'} direction={'column'} gap={'sm'}>
            <DisclosureFilterGender />

            <DisclosureFilterSize />

            <DisclosureFilterSpecie />

            <DisclosureFilterBreed />

            <DisclosureFilterAge />
        </Flex>
    )
}