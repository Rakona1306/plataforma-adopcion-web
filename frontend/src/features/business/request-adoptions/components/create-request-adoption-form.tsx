import FormContainer from "@/components/molecules/form-container"
import { CreateRequestAdoptionDto, CreateRequestAdoptionSchema } from "../dto/dashboard/create-request-adoption"
import { useGetAllUser } from "@/core/application/features/organization/user/hooks/useGetAllUser"
import { SearchSelect } from "@/components/organisms/search-select"
import { Avatar, Grid, Skeleton } from "@mantine/core"
import ButtonUI from "@/components/atoms/button/button-ui"
import { ToggleField } from "@/components/atoms/toggle-field"
import Input from "@/components/atoms/input"
import SelectInput from "@/components/organisms/select-input"
import { limaDistricts } from "@/core/shared/constants/distritcts"
import { useGetAllPet } from "@/core/application/features/shelter/pets/hooks/useGetAllPet"
import { SearchSelectField } from "@/components/molecules/forms/sarch-select-field"
import useCreateRequestAdoption from "../hooks/dashboard/use-create-request-adoption"
import { useModal } from "@/core/application/hooks/ui/useModal"
import Swal from "sweetalert2"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/shared/constants/queryKeys"

export default function CreateRequestAdoptionForm() {

    const { data: users, isLoading: isLoadingUsers, updateFilter } = useGetAllUser({ page: 1, pageSize: 10 })
    const { data: pets, isLoading: isLoadingPets, updateFilter: updatePetFilter } = useGetAllPet({ initialFilter: { page: 1, pageSize: 10 } })
    const { createAdoption } = useCreateRequestAdoption()
    const { handleCloseModal } = useModal() || {}
    const queryClient = useQueryClient()

    const initialValues: CreateRequestAdoptionDto = {
        acceptHomeVisit: false,
        address: '',
        district: '',
        hasChildren: false,
        hasOtherPets: false,
        houseType: '',
        motivation: '',
        petId: '',
        phone: '',
        reference: '',
        userId: '',
        dni: ''
    }

    return (
        <FormContainer
            initialValues={initialValues}
            onSubmit={(values) => {
                createAdoption(values, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BUSINESS.REQUEST_ADOPTION] })
                        handleCloseModal?.()
                        Swal.fire({
                            icon: 'success',
                            title: 'Solicitud de adopción creada',
                            text: 'La solicitud de adopción se ha creado correctamente.',
                        })
                    }
                })
            }}
            validationSchema={CreateRequestAdoptionSchema}
            className="space-y-5"
        >
            {({ setFieldValue, values }) => (
                <>
                    {
                        isLoadingUsers || !users ? (
                            <Skeleton width="100%" height={40} />
                        ) : (
                            <SearchSelect
                                description="Busca al usuario que desea realizar la solicitud de adopción"
                                label="Usuario"
                                name="userId"
                                options={users.items.map((item) => ({
                                    value: item.id,
                                    label: `${item.name} - ${item.email}`
                                }))}
                                onOptionSelected={(item) => {
                                    const selected = users.items.find((x) => x.id === item.value)
                                    setFieldValue('dni', selected?.dni || '')
                                    setFieldValue('phone', selected?.phone || '')
                                    setFieldValue('district', selected?.district || '')
                                }}
                                displayField="label"
                                valueField="value"
                                isLoading={isLoadingUsers}
                                onSearch={(value) => updateFilter({ search: value })}
                                required
                            />
                        )
                    }
                    {
                        isLoadingPets || !pets ? (
                            <Skeleton width="100%" height={40} />
                        ) : (
                            <SearchSelectField
                                description="Busca la mascota que desea adoptar"
                                label="Mascota"
                                name="petId"
                                options={pets.items || []}
                                renderOption={(item) => (
                                    <div className="flex items-center gap-3">
                                        <Avatar src={item.photoUrls && item.photoUrls.length > 0 ? item.photoUrls[0].url : undefined} w={20} h={20} />
                                        <span>{item.name} - {item.speciesName}</span>
                                    </div>
                                )}
                                displayField="name"
                                valueField="id"
                                isLoading={isLoadingPets}
                                onSearch={(value) => updatePetFilter({ search: value })}
                                required
                            />
                        )
                    }
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="address"
                                label="Dirección"
                                placeholder="Ingrese la dirección completa"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="dni"
                                label="DNI"
                                placeholder="Ingrese el DNI"
                                required
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="phone"
                                placeholder="Ingrese el número de teléfono"
                                label="Telefono"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <SelectInput
                                name="district"
                                label="Distrito"
                                placeholder="Seleccione un distrito"
                                options={limaDistricts}
                                defaultValue={''}
                                required
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col>
                            <ToggleField
                                label="Aceptas visita a domicilio?"
                                subtitle="Selecciona si es cierto"
                                value={values.acceptHomeVisit}
                                onChange={(v) => setFieldValue("acceptHomeVisit", v)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <ToggleField
                                label="Tiene otras mascotas?"
                                subtitle="Selecciona si es cierto"
                                value={values.hasOtherPets}
                                onChange={(v) => setFieldValue("hasOtherPets", v)}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <ToggleField
                                label="Tiene niños en casa?"
                                subtitle="Selecciona si es cierto"
                                value={values.hasChildren}
                                onChange={(v) => setFieldValue("hasChildren", v)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="houseType"
                                label="Tipo de vivienda"
                                placeholder="Ingrese el tipo de vivienda"
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="motivation"
                                label="Motivación"
                                placeholder="Ingrese su motivación para adoptar"
                                required
                            />
                        </Grid.Col>
                    </Grid>

                    <ButtonUI fullWidth type="submit" color="primary" size="md">
                        Crear Solicitud
                    </ButtonUI>
                </>
            )}
        </FormContainer>
    )
}