"use client";
import { PetVaccine } from "../../model/pet-vaccine.model";
import { Button, Card, Divider, Grid } from "@mantine/core";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { BiTrash } from "react-icons/bi";
import { MdUpdate } from "react-icons/md";
import useDeletePetVaccine from "../../hooks/useDeletePetVaccine";
import { useModal } from "@/core/application/hooks/ui/useModal";
import PetVaccineEditForm from "../forms/pet-vaccine-edit-form";

interface Props {
    petVaccine: PetVaccine
    idx: number
}

export default function PetVaccineCard({ petVaccine, idx }: Props) {
    const { deleteConfirmed } = useDeletePetVaccine()
    const { handleOpenModal } = useModal() || {}

    function handleEditForm(petVaccine: PetVaccine) {
        handleOpenModal?.({
            header: `Editar Relacion: ${petVaccine.pet.name} - ${petVaccine.vaccine.name}`,
            content: <PetVaccineEditForm petVaccine={petVaccine} />
        })
    }

    return (
        <Card shadow="sm" padding='lg' withBorder radius={20} classNames={{ root: 'gap-4' }}>
            <h2 className="text-lg font-bold text-slate-800">Vacuna #{idx + 1}</h2>
            <Divider />
            <Grid className="text-slate-800">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <p className="font-bold">Mascota:</p>
                    <p>{petVaccine.pet.name}</p>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <p className="font-bold">Vacuna:</p>
                    <p>{petVaccine.vaccine.name}</p>
                </Grid.Col>
            </Grid>

            <Grid className="text-slate-800">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <p className="font-bold">Fecha aplicada:</p>
                    <p>{formatDateTime(petVaccine.appliedDate, true)}</p>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <p className="font-bold">Fecha expiracion:</p>
                    <p>{formatDateTime(petVaccine.expirationDate, true)}</p>
                </Grid.Col>
            </Grid>

            <Divider />

            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Button
                        onClick={() => deleteConfirmed(petVaccine.id)}
                        classNames={{
                            root: "bg-red-600! text-white font-bold hover:bg-red-700!",
                            label: "flex! gap-2! text-md items-center!"
                        }}
                    >
                        <BiTrash size={20} />
                        <span>Borrar</span>
                    </Button>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Button
                        onClick={() => handleEditForm(petVaccine)}
                        color="red"
                        classNames={{
                            label: 'flex! gap-2! text-md items-center!'
                        }}
                    >
                        <MdUpdate size={20} />
                        <span>Actualizar</span>
                    </Button>
                </Grid.Col>
            </Grid>
        </Card>
    )
}