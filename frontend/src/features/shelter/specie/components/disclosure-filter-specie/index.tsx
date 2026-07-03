import { useFilterPlpStore } from "@/store/use-filter-plp-store";
import { Box, Checkbox, Collapse, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { PiCaretDownLight } from "react-icons/pi";
import useGetAllSpecie from "../../hooks/use-get-all-specie";
import { v4 as uuid } from "uuid";
import { montserrat } from "@/lib/fonts/monserrat";
import { cn } from "@/lib/utils";
import { FEATURE_FILTER } from "@/shared/constants/feature_filter";


export default function DisclosureFilterSpecie() {

    const { data, isLoading, isError } = useGetAllSpecie()
    const { removeFilter, setFilter, searchFilter, returnArrayString, filters } = useFilterPlpStore()
    const [localValues, setLocalValues] = useState<string[]>([]);
    const [expanded, { toggle }] = useDisclosure(false);

    useEffect(() => {
        setLocalValues(returnArrayString(FEATURE_FILTER.SPECIE.VALUE));
    }, [filters, returnArrayString]);

    const handleGroupChange = (nextValues: string[]) => {

        setLocalValues(nextValues);
        const currentStoreValues = returnArrayString(FEATURE_FILTER.SPECIE.VALUE);

        if (nextValues.length > currentStoreValues.length) {
            const addedKey = nextValues.find((val) => !currentStoreValues.includes(val));
            const item = data?.find((d) => d.id.toString() === addedKey);

            if (item) {
                setFilter({
                    uid: uuid(),
                    feature: FEATURE_FILTER.SPECIE.VALUE,
                    id: item.id.toString(),
                    name: item.name,
                });
            }
        } else {
            const removedKey = currentStoreValues.find((val) => !nextValues.includes(val));
            const item = data?.find((d) => d.id.toString() === removedKey);

            if (item) {
                const filterSearched = searchFilter(item.name, item.id.toString());
                if (filterSearched) removeFilter(filterSearched);
            }
        }
    };

    return (
        <Box>
            <button
                onClick={toggle}
                aria-expanded={expanded}
                className={cn(
                    "w-full flex items-center justify-between px-4 py-3",
                    "text-slate-900 font-bold",
                    "bg-white border border-gray-200 transition-all duration-300",
                    montserrat.className,
                    expanded
                        ? "rounded-t-md border-b-transparent"
                        : "rounded-md hover:border-gray-300 hover:bg-gray-50"
                )}
            >
                <Text size="sm" fw={500}>
                    Especies
                </Text>
                <span className="flex items-center gap-2">
                    <PiCaretDownLight
                        size={16}
                        className={cn(
                            "text-slate-800 transition-transform duration-200",
                            expanded && "rotate-180"
                        )}
                    />
                </span>
            </button>

            <Collapse expanded={expanded} transitionDuration={200}>
                <div className="border border-t-0 border-gray-200 rounded-b-md bg-white py-3">
                    <Box className="space-y-3!">
                        {
                            isLoading ? (
                                <Box className="space-y-3 px-4!">
                                    <Skeleton w={'60%'} h={'35px'} />
                                    <Skeleton w={'70%'} h={'35px'} />
                                    <Skeleton w={'40%'} h={'35px'} />
                                </Box>
                            ) : (
                                <>
                                    {
                                        isError || !data || data.length === 0 && (
                                            <Box w={'100%'} className="px-4!" mt={'sm'}>
                                                <p className="text-xs md:text-sm! text-red-500">No se han encontrado resultados</p>
                                            </Box>
                                        )
                                    }
                                    <Checkbox.Group
                                        value={localValues}
                                        // onChange={setValue}
                                        onChange={handleGroupChange}
                                    >
                                        <Group align="flex-start" className="flex! flex-col! gap-0! divide-y divide-gray-100">
                                            {data && data?.map((item) => (
                                                <Checkbox
                                                    key={item.id}
                                                    value={item.id.toString()}
                                                    label={item.name}
                                                    // onChange={(e) => handleChange(e, item)}
                                                    className="w-full px-4 py-2.5"
                                                    classNames={{
                                                        input: "checked:bg-primary! checked:border-primary!",
                                                        label: "text-sm text-gray-700 cursor-pointer",
                                                    }}
                                                />
                                            ))}
                                        </Group>
                                    </Checkbox.Group>
                                </>
                            )
                        }
                    </Box>
                </div>
            </Collapse>
        </Box>
    );
}