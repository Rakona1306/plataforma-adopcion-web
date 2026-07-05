"use client";

import ButtonUI from "@/components/atoms/button/button-ui";
import Input from "@/components/atoms/input";
import Textarea from "@/components/atoms/text-area";
import { ToggleField } from "@/components/atoms/toggle-field";
import FormContainer from "@/components/molecules/form-container";
import SelectInput from "@/components/organisms/select-input";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { limaDistricts } from "@/core/shared/constants/distritcts";
import { CreateReqAdoptionDetail, createReqAdoptionDetailSchema } from "@/features/business/adoption/dto/create-adoption.dto";
import useCreateAdoption from "@/features/business/adoption/hooks/use-create-adoption";
import { PetPublic } from "@/features/shelter/pet/model/pet-pub.model";
import { useProfile } from "@/features/system/auth/hooks/useProfile";
import { Grid, Skeleton } from "@mantine/core";
import Swal from "sweetalert2";
import { AlertCircle } from "lucide-react";

interface AdoptionModalProps {
    pet?: PetPublic
}

export function AdoptionModal({ pet }: AdoptionModalProps) {

    const { profile, isLoading } = useProfile()
    const { handleCloseModal } = useModal() || {}
    const { createAdoption, isPending, isError } = useCreateAdoption({
        onSuccess: () => {
            handleCloseModal?.();
            Swal.fire({
                title: 'Solicitud enviada',
                text: 'Tu solicitud de adopción ha sido enviada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        },
        onError: (error) => {
            console.error('Error al enviar la solicitud de adopción:', error);
            // Aquí puedes agregar la lógica para mostrar un mensaje de error al usuario.
        }
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Skeleton height={15} width={80} radius="xs" mb={8} />
                        <Skeleton height={40} radius="sm" />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Skeleton height={15} width={80} radius="xs" mb={8} />
                        <Skeleton height={40} radius="sm" />
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Skeleton height={55} radius="sm" />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Skeleton height={55} radius="sm" />
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={12}>
                        <Skeleton height={55} radius="sm" />
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Skeleton height={15} width={100} radius="xs" mb={8} />
                        <Skeleton height={40} radius="sm" />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Skeleton height={15} width={70} radius="xs" mb={8} />
                        <Skeleton height={40} radius="sm" />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={12}>
                        <Skeleton height={15} width={80} radius="xs" mb={8} />
                        <Skeleton height={40} radius="sm" />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={12}>
                        <Skeleton height={15} width={110} radius="xs" mb={8} />
                        <Skeleton height={80} radius="sm" />
                    </Grid.Col>
                </Grid>

                <Skeleton height={44} radius="sm" />
            </div>
        );
    }

    if (!pet || !profile) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-6 max-w-md mx-auto">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
                    <AlertCircle size={36} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        No se pudo cargar el formulario
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {!pet 
                            ? "Lo sentimos, no pudimos encontrar los datos de la mascota seleccionada. Inténtalo de nuevo." 
                            : "Para enviar una solicitud de adopción, necesitas estar registrado e iniciar sesión en tu cuenta."}
                    </p>
                </div>
                <ButtonUI onClick={() => handleCloseModal?.()} rootClassName="w-full sm:w-auto px-8!">
                    Cerrar
                </ButtonUI>
            </div>
        );
    }

    const initialValues: CreateReqAdoptionDetail = {
        motivation: '',
        district: profile.district || '',
        phone: profile.phone || '',
        petId: pet.id,
        notes: '',
        houseType: '',
        hasOtherPets: false,
        hasChildren: false,
        acceptHomeVisit: false,
        userId: profile.id,
    }

    const handleSubmit = (values: CreateReqAdoptionDetail) => {
        createAdoption(values);
    }

    return (
        <FormContainer<CreateReqAdoptionDetail>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={createReqAdoptionDetailSchema}
            className="space-y-6"
        >
            {({ setFieldValue, values }) => (
                <>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="phone"
                                defaultValue={profile.phone || ''}
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
                                defaultValue={profile.district || ''}
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
                        <Grid.Col span={12}>
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
                            <Input
                                name="houseType"
                                label="Tipo de vivienda"
                                placeholder="Ingrese el tipo de vivienda"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="Pet"
                                label="Mascota"
                                defaultValue={pet.name}
                                disabled
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid>
                        <Grid.Col span={12}>
                            <Input
                                name="motivation"
                                label="Motivación"
                                placeholder="Ingrese su motivación para adoptar"
                                required
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid>
                        <Grid.Col span={12}>
                            <Textarea
                                name="notes"
                                label="Notas adicionales"
                                placeholder="Ingrese notas adicionales (opcional)"
                            />
                        </Grid.Col>
                    </Grid>

                    <ButtonUI loading={isPending} type="submit" rootClassName="w-full!">
                        Enviar solicitud de adopción
                    </ButtonUI>
                </>
            )}

        </FormContainer>
    );
}
