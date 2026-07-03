import { montserrat } from "@/lib/fonts/monserrat";
import { cn } from "@/lib/utils";
import { FEATURE_FILTER } from "@/shared/constants/feature_filter";
import { useFilterPlpStore } from "@/store/use-filter-plp-store";
import { Box, Collapse, Group, NumberInput, RangeSlider, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { PiCaretDownLight } from "react-icons/pi";
import { v4 as uuid } from "uuid";

const AGE_CONFIG = FEATURE_FILTER.AGE;
const MIN_AGE_DEFAULT = 1;
const MAX_AGE_DEFAULT = 20;

export default function DisclosureFilterAge() {

    const [expanded, { toggle }] = useDisclosure(false);
    const { setFilter, removeFilter, filters } = useFilterPlpStore();

    // Estado local para controlar el rango [mínimo, máximo]
    const [sliderValues, setSliderValues] = useState<[number, number]>([MIN_AGE_DEFAULT, MAX_AGE_DEFAULT]);

    // Sincronizar desde el store global de Zustand por si se limpian los filtros desde afuera
    useEffect(() => {
        const globalFilters = useFilterPlpStore.getState().filters;
        const minFilter = globalFilters.find(f => f.feature === AGE_CONFIG.VALUE && f.name === AGE_CONFIG.MIN_ID);
        const maxFilter = globalFilters.find(f => f.feature === AGE_CONFIG.VALUE && f.name === AGE_CONFIG.MAX_ID);

        const min = minFilter ? parseInt(minFilter.id, 10) : MIN_AGE_DEFAULT;
        const max = maxFilter ? parseInt(maxFilter.id, 10) : MAX_AGE_DEFAULT;

        setSliderValues([min, max]);
    }, [filters]);

    // Función unificada para guardar los rangos en Zustand limpiando estados previos
    const syncWithZustand = (min: number, max: number) => {
        const currentFilters = useFilterPlpStore.getState().filters;
        const prevMin = currentFilters.find(f => f.feature === AGE_CONFIG.VALUE && f.name === AGE_CONFIG.MIN_ID);
        const prevMax = currentFilters.find(f => f.feature === AGE_CONFIG.VALUE && f.name === AGE_CONFIG.MAX_ID);

        if (prevMin) removeFilter(prevMin);
        if (prevMax) removeFilter(prevMax);

        if (min > MIN_AGE_DEFAULT) {
            setFilter({
                uid: uuid(),
                feature: AGE_CONFIG.VALUE,
                id: min.toString(),
                name: `${AGE_CONFIG.MIN_ID} - ${min}a.` || ''
            });
        }

        if (max < MAX_AGE_DEFAULT) {
            setFilter({
                uid: uuid(),
                feature: AGE_CONFIG.VALUE,
                id: max.toString(),
                name: `${AGE_CONFIG.MAX_ID} - ${max}a.` || ''
            });
        }
    };

    // Manejador para cuando el usuario modifica los inputs numéricos directamente
    const handleInputChange = (index: 0 | 1, value: string | number) => {
        const numValue = typeof value === 'string' ? parseInt(value, 10) || (index === 0 ? MIN_AGE_DEFAULT : MAX_AGE_DEFAULT) : value;

        const newValues: [number, number] = [...sliderValues];

        if (index === 0) {
            // Validar que el mínimo no supere el máximo actual
            newValues[0] = Math.min(Math.max(numValue, MIN_AGE_DEFAULT), sliderValues[1]);
        } else {
            // Validar que el máximo no sea menor que el mínimo actual
            newValues[1] = Math.max(Math.min(numValue, MAX_AGE_DEFAULT), sliderValues[0]);
        }

        setSliderValues(newValues);
        syncWithZustand(newValues[0], newValues[1]);
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
                    Edad
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
                <div className="border border-t-0 border-gray-200 rounded-b-md bg-white py-5 px-6 space-y-5">
                    {/* Contenedor de los Inputs de Texto Numéricos */}
                    <Group grow gap="sm">
                        <NumberInput
                            label="Mínimo"
                            placeholder="1"
                            min={MIN_AGE_DEFAULT}
                            max={sliderValues[1]}
                            value={sliderValues[0]}
                            onChange={(val) => handleInputChange(0, val)}
                            suffix=" a."
                            classNames={{ input: "focus:border-blue-500!" }}
                        />
                        <NumberInput
                            label="Máximo"
                            placeholder="20"
                            min={sliderValues[0]}
                            max={MAX_AGE_DEFAULT}
                            value={sliderValues[1]}
                            onChange={(val) => handleInputChange(1, val)}
                            suffix=" a."
                            classNames={{ input: "focus:border-blue-500!" }}
                        />
                    </Group>

                    {/* Slider de rango */}
                    <Box className="pt-2 pb-2">
                        <RangeSlider
                            min={MIN_AGE_DEFAULT}
                            max={MAX_AGE_DEFAULT}
                            step={1}
                            minRange={0}
                            value={sliderValues}
                            onChange={setSliderValues} // Reacción visual inmediata fluida
                            onChangeEnd={(values) => syncWithZustand(values[0], values[1])} // Al soltar, actualiza Zustand
                            label={(value) => `${value} a.`}
                            styles={{
                                track: { backgroundColor: '#f1f5f9' },
                                bar: { backgroundColor: '#3b82f6' },
                                thumb: { borderColor: '#3b82f6', borderWidth: 2 }
                            }}
                        />
                    </Box>
                </div>
            </Collapse>
        </Box>
    );
}