"use client";

import ButtonUI from "@/components/atoms/button/button-ui";
import Input from "@/components/atoms/input";
import { ToggleField } from "@/components/atoms/toggle-field";
import FormContainer from "@/components/molecules/form-container";
import SelectInput from "@/components/organisms/select-input";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { limaDistricts } from "@/core/shared/constants/distritcts";
import { PetPublic } from "@/features/shelter/pet/model/pet-pub.model";
import { useProfile } from "@/features/system/auth/hooks/useProfile";
import { Grid, Skeleton } from "@mantine/core";
import Swal from "sweetalert2";
import { AlertCircle } from "lucide-react";
import useCreatePubRequestAdoption from "@/features/business/request-adoptions/hooks/web/use-create-pub-request-adoption";
import { CreatePubReqAdoption, createPubRequestAdoptionSchema } from "@/features/business/request-adoptions/dto/web/create-request-adoption.dto";
import { Alert } from "@/components/atoms/alert";

interface AdoptionModalProps {
    pet?: PetPublic
}

export function AdoptionModal({ pet }: AdoptionModalProps) {

    const { profile, isLoading } = useProfile()
    const { handleCloseModal } = useModal() || {}
    const { createAdoption, isPending, errorMessage, errorValidation, isError } = useCreatePubRequestAdoption({
        onSuccess: () => {
            handleCloseModal?.();
            Swal.fire({
                title: 'Solicitud enviada',
                text: 'Tu solicitud de adopción ha sido enviada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        },
        onError: (error: any) => {
            if (error.data.type && error.data.type === 'INVALID_OPERATION') {
                handleCloseModal?.();
                Swal.fire({
                    title: 'Error al enviar la solicitud',
                    text: error.data.message || 'Ocurrió un error al enviar la solicitud de adopción. Por favor, inténtalo de nuevo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
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

    const initialValues: CreatePubReqAdoption = {
        motivation: '',
        district: profile.district || '',
        phone: profile.phone || '',
        petId: pet.id,
        notes: '',
        houseType: '',
        hasOtherPets: false,
        hasChildren: false,
        acceptHomeVisit: false,
        address: '',
        dni: profile.dni || ''
    }

    const handleSubmit = (values: CreatePubReqAdoption) => {
        createAdoption(values);
    }

    return (
        <FormContainer<CreatePubReqAdoption>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={createPubRequestAdoptionSchema}
            className="space-y-6"
        >
            {({ setFieldValue, values, errors, handleBlur }) => (
                <>
                    {
                        isError && errorMessage && (
                            <Alert
                                message={errorMessage}
                                type="error"
                            />
                        )
                    }
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="phone"
                                defaultValue={profile.phone || ''}
                                label="Telefono"
                                error={errorValidation.phone}
                                required
                                disabled
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <SelectInput
                                name="district"
                                label="Distrito"
                                placeholder="Seleccione un distrito"
                                options={limaDistricts}
                                defaultValue={profile.district || ''}
                                required
                                error={errorValidation.district}
                                disabled
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
                                error={errors.hasOtherPets || errorValidation.hasOtherPets}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <ToggleField
                                label="Tiene niños en casa?"
                                subtitle="Selecciona si es cierto"
                                value={values.hasChildren}
                                onChange={(v) => setFieldValue("hasChildren", v)}
                                error={errors.hasChildren || errorValidation.hasChildren}
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
                                error={errors.acceptHomeVisit || errorValidation.acceptHomeVisit}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="address"
                                label="Dirección"
                                placeholder="Ingrese su dirección completa"
                                required
                                onBlur={handleBlur}
                                autoFocus={false}
                                error={errorValidation.address}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Input
                                name="dni"
                                label="DNI"
                                placeholder="Ingrese el DNI"
                                required
                                defaultValue={profile.dni || ''}
                                autoFocus={false}
                                error={errors.dni || errorValidation.dni}
                                disabled
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
                                autoFocus={false}
                                error={errorValidation.houseType}
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
                                error={errorValidation.motivation}
                            />
                        </Grid.Col>
                    </Grid>

                    <ButtonUI loading={isPending} type="submit" fullWidth>
                        Enviar solicitud de adopción
                    </ButtonUI>
                </>
            )}

        </FormContainer>
    );
}
