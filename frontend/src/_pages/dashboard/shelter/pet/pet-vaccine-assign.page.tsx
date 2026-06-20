"use client";

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard"
import HeaderDashboard from "@/app/dashboard/_components/molecules/header-dashboard"
import { FormSection } from "@/components/atoms/form-section";
import FormContainer from "@/components/molecules/form-container";
import { FormikDateInputField } from "@/components/molecules/forms/formik-date-input";
import { SearchSelect } from "@/components/organisms/search-select";
import { useGetAllVaccine } from "@/core/application/features/shelter/vaccines/hooks/useGetAllVaccine";
import { Vaccine } from "@/core/domain/models/shelter/vaccine";
import PetVaccineCard from "@/features/shelter/pet-vaccine/components/cards/pet-vaccine-card";
import PetVaccineListLoading from "@/features/shelter/pet-vaccine/components/loadings/pet-vaccine-list.loading";
import { PetVaccineCreateDto } from "@/features/shelter/pet-vaccine/dto/pet-vaccine-create.dto";
import useCreatePetVaccine from "@/features/shelter/pet-vaccine/hooks/useCreatePetVaccine";
import { useGetAllPetVaccine } from "@/features/shelter/pet-vaccine/hooks/useGetAllPetVaccine"
import { petVaccineSchema } from "@/features/shelter/pet-vaccine/schemas/pet-vaccine.schema";
import { Button, Grid } from "@mantine/core";
import { useRouter } from "next/navigation";
import { BiListCheck } from "react-icons/bi";
import { IoInformation } from "react-icons/io5";

interface Props {
    id: string
}

export default function PetVaccineAssignPage({ id }: Props) {

    const { data: petVaccines, isPending } = useGetAllPetVaccine({ petId: id, pageSize: 8 })
    const { data: vaccines, updateFilter } = useGetAllVaccine()
    const router = useRouter()
    const { create, isPending: createPending, errorValidation } = useCreatePetVaccine();

    const initialValues: PetVaccineCreateDto = {
        appliedDate: new Date(),
        petId: id,
        vaccineId: '',
        expirationDate: undefined
    }

    function handleSubmit(values: PetVaccineCreateDto) {
        create(values)
    }

    function handleBack() {
        router.back()
    }


    console.log(errorValidation)

    return (
        <>
            <HeaderDashboard>
                <h1 className="text-lg md:text-2xl font-bold text-slate-800">
                    Asignar Vacuna a la mascota
                </h1>
            </HeaderDashboard>
            <BodyDashboard className="space-y-5">
                <FormSection
                    title="Formulario de asignar vacuna"
                    subtitle="Asignar la vacuna a la mascota y los que tiene asignados"
                    icon={<IoInformation />}
                >
                    <FormContainer
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={petVaccineSchema}
                        className="space-y-5"
                    >
                        <Grid>
                            <Grid.Col>
                                <SearchSelect<Vaccine>
                                    label="Vacuna"
                                    name="vaccineId"
                                    options={vaccines?.items || []}
                                    displayField="name"
                                    valueField="id"
                                    placeholder="Buscar especie..."
                                    onSearch={(value) => updateFilter({ search: value })}
                                />
                            </Grid.Col>
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
                                <Button classNames={{
                                    root: 'bg-gray-500! hover:bg-gray-400!'
                                }} type="button" onClick={handleBack}>
                                    Volver
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Button type="submit" loading={createPending}>
                                    Asignar vacuna
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </FormContainer>
                </FormSection>

                <FormSection
                    title="Lista de Vacunas Asignadas"
                    subtitle="-"
                    icon={<BiListCheck />}
                >
                    {
                        isPending ? (
                            <PetVaccineListLoading />
                        ) : (
                            <Grid>
                                {
                                    petVaccines?.items.map((item, idx) => (
                                        <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={idx}>
                                            <PetVaccineCard petVaccine={item} idx={idx} />
                                        </Grid.Col>
                                    ))
                                }
                            </Grid>
                        )
                    }
                </FormSection>
            </BodyDashboard>
        </>
    )
}