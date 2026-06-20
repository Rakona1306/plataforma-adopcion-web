import FormContainer from "@/components/molecules/form-container";
import { PetVaccine } from "../../model/pet-vaccine.model";
import { PetVaccineUpdateDto } from "../../dto/pet-vaccine-update.dto";
import { Button, Grid } from "@mantine/core";
import Input from "@/components/atoms/input";
import { SearchSelect } from "@/components/organisms/search-select";
import { Vaccine } from "@/core/domain/models/shelter/vaccine";
import { useGetAllVaccine } from "@/core/application/features/shelter/vaccines/hooks/useGetAllVaccine";
import { FormikDateInputField } from "@/components/molecules/forms/formik-date-input";
import { useUpdateVaccine } from "@/core/application/features/shelter/vaccines/hooks/useUpdateVaccine";
import useUpdatePetVaccineService from "../../hooks/useUpdatePetVaccine";
import { petVaccineSchema } from "../../schemas/pet-vaccine.schema";
import { useModal } from "@/core/application/hooks/ui/useModal";

interface Props {
    petVaccine: PetVaccine
}

export default function PetVaccineEditForm({ petVaccine }: Props) {

    const { data: vaccines, updateFilter } = useGetAllVaccine()
    const { errorValidation, update } = useUpdatePetVaccineService()
    const { handleCloseModal } = useModal() || {}

    const initialValues: PetVaccineUpdateDto = {
        appliedDate: petVaccine.appliedDate,
        petId: petVaccine.petId,
        vaccineId: petVaccine.vaccineId,
        expirationDate: petVaccine.expirationDate ?? undefined,
    }

    function handleSubmit(values: PetVaccineUpdateDto) {
        update({ dto: values, id: petVaccine.id })
    }

    function handleClose() {
        handleCloseModal?.()
    }

    return (
        <FormContainer
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={petVaccineSchema}
            className="space-y-5"
        >
            <Grid>
                <Grid.Col>
                    <Input label="Mascota" name="pet" defaultValue={petVaccine.pet.name} disabled />
                </Grid.Col>
                <Grid.Col>
                    <SearchSelect<Vaccine>
                        label="Vacuna"
                        name="vaccineId"
                        options={vaccines?.items || []}
                        displayField="name"
                        valueField="id"
                        placeholder="Buscar especie..."
                        onSearch={(value) => updateFilter({ search: value })}
                        defaultValue={petVaccine.vaccine.name}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <FormikDateInputField
                        name="appliedDate"
                        label="Fecha de vacuna aplicada"
                        error={errorValidation.applieddate}
                        required
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <FormikDateInputField
                        name="expirationDate"
                        label="Fecha expiracion"
                        error={errorValidation.expirationdate}
                    />
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Button type="button" onClick={handleClose} classNames={{
                        root: 'bg-gray-600! hover:bg-gray-500!'
                    }}>
                        Cancelar
                    </Button>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Button type="submit">
                        Actualizar
                    </Button>
                </Grid.Col>
            </Grid>
        </FormContainer>
    )
}