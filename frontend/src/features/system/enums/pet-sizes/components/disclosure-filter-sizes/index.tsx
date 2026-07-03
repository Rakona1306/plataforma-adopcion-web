import { useDisclosure } from "@mantine/hooks";
import { useGetPetSizes } from "../../hooks/useGetPetSizes";
import { useEffect, useMemo, useState } from "react";
import { Box, Checkbox, Collapse, Group, Skeleton, Text } from "@mantine/core";
import { montserrat } from "@/lib/fonts/monserrat";
import { cn } from "@/lib/utils";
import { PiCaretDownLight } from "react-icons/pi";
import { useFilterPlpStore } from "@/store/use-filter-plp-store";
import { v4 as uuid } from 'uuid'

const FEATURE = 'SIZE'

export default function DisclosureFilterSize() {
    const { data, isLoading } = useGetPetSizes()
    const [expanded, { toggle }] = useDisclosure(false);
    const { removeFilter, setFilter, searchFilter, returnArrayString } = useFilterPlpStore()
    const filters = useFilterPlpStore((state) => state.filters);
    const [localValues, setLocalValues] = useState<string[]>([]);

    useEffect(() => {
        setLocalValues(returnArrayString(FEATURE));
    }, [filters, returnArrayString]);

    if (isLoading || !data) {
        return <Skeleton w="100%" h={44} radius="md" />;
    }

    const handleGroupChange = (nextValues: string[]) => {
        // 1. Actualizamos el estado visual al instante para que no se tranque el check
        setLocalValues(nextValues);

        // 2. Evaluamos si el usuario agregó o quitó un elemento comparando con el store
        const currentStoreValues = returnArrayString(FEATURE);

        if (nextValues.length > currentStoreValues.length) {
            const addedKey = nextValues.find((val) => !currentStoreValues.includes(val));
            const item = data.find((d) => d.key.toString() === addedKey);

            if (item) {
                setFilter({
                    uid: uuid(),
                    feature: FEATURE,
                    id: item.key.toString(),
                    name: item.value,
                });
            }
        } else {
            const removedKey = currentStoreValues.find((val) => !nextValues.includes(val));
            const item = data.find((d) => d.key.toString() === removedKey);

            if (item) {
                const filterSearched = searchFilter(item.value, item.key.toString());
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
                    Tamaños
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
                <div className="border border-t-0 border-gray-200 rounded-b-md bg-white">
                    <Checkbox.Group
                        maxSelectedValues={data.length - 1}
                        value={localValues}
                        // onChange={setValue}
                        onChange={handleGroupChange}
                    >
                        <Group align="flex-start" className="flex! flex-col! gap-0! divide-y divide-gray-100">
                            {data.map((item) => (
                                <Checkbox
                                    key={item.key}
                                    value={item.key.toString()}
                                    label={item.value}
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
                </div>
            </Collapse>
        </Box>
    );
}