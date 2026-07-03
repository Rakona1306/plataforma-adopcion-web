import ButtonUI from "@/components/atoms/button/button-ui";
import { useWindowWidth } from "@/hooks/use-window-width";
import { Box, Divider, Drawer, Flex, Pill, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsDiagram2 } from "react-icons/bs";
import { FilterDrawerContent } from "./filter-drawer-content";
import { useFilterPlpStore } from "@/store/use-filter-plp-store";
import { useFilterPetStore } from "@/features/shelter/pet/store/use-filter-pet-store";

export default function FilterDrawer() {

    const [opened, { open, close }] = useDisclosure(false);
    const { isMobile } = useWindowWidth()
    const { filters, removeFilter, cleanFilters } = useFilterPlpStore()
    const { confirmFilters } = useFilterPetStore()

    const handleApplyFilters = () => {
        confirmFilters()
        close()
    }

    const handleCleanFilters = () => {
        cleanFilters()
    }

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                title="Filtros de Busqueda"
                position={isMobile ? 'bottom' : 'left'}
                size={isMobile ? 'xl' : 'md'}
                keepMounted={false}
                classNames={{
                    content: 'rounded-t-3xl! md:rounded-t-none! md:rounded-tr-3xl! flex! flex-col!',
                    body: 'flex! flex-col! flex-1! overflow-hidden! px-4! p-0!',
                }}
            >
                <Divider my={'sm'} />

                <Text size="sm" fw={'600'} mb={'lg'}>Filtros Seleccionados</Text>

                {/* <Divider my={'sm'} mb={'lg'} /> */}

                <Box w={'100%'} mih={'40px'} display={'flex'} className="items-center!">
                    {
                        filters.length === 0 ? (
                            <Text size="sm" className="text-gray-400! font-bold!">

                                No hay filtros seleccionados...
                            </Text>
                        ) : (
                            <Flex gap={'0.25rem'} wrap={'wrap'} w={'100%'}>
                                {
                                    filters.map((item) => (
                                        <Pill
                                            classNames={{
                                                root: 'w-fit! ps-4! pe-2! py-2! h-auto! hover:bg-gray-200! transition-all duration-300',
                                                remove: 'text-lg!'
                                            }}
                                            withRemoveButton
                                            onRemove={() => removeFilter(item)}
                                        >
                                            {item.name}
                                        </Pill>
                                    ))
                                }
                            </Flex>
                        )
                    }
                </Box>

                <Divider my={'sm'} mt={'lg'} />

                <Text size="sm" fw={'600'} mb={'lg'}>Filtros</Text>

                {/* <Divider my={'sm'} mb={'lg'} /> */}

                {/* Contenido scrolleable */}
                <div className="flex-1 overflow-y-auto min-h-0 pb-4">
                    <FilterDrawerContent />
                </div>

                {/* Footer fijo */}
                <div className="shrink-0 border-t border-gray-200 pt-4 pb-4 flex gap-3">
                    <ButtonUI intent="cancel" className="flex-1" onClick={handleCleanFilters}>
                        Limpiar
                    </ButtonUI>
                    <ButtonUI intent="primary" className="flex-1" onClick={handleApplyFilters}>
                        Aplicar filtros ({filters.length})
                    </ButtonUI>
                </div>

            </Drawer>

            <ButtonUI rootClassName="rounded-3xl!" intent="normal" maw={'150px'} onClick={open}>
                <div className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded-full flex justify-center items-center">{filters.length}</div>

                <BsDiagram2 size={25} />
                Filtros
            </ButtonUI>
        </>
    )
}