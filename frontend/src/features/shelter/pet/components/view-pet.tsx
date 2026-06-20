"use client";

import { FormSection } from "@/components/atoms/form-section";
import { DataDisplay } from "@/components/atoms/sections/data-display";
import ImageSlider from "@/components/molecules/image-slider/image-slider";
import { Pet } from "@/core/domain/models/shelter/pet";
import { Grid, Badge, Tooltip } from "@mantine/core";
import dayjs from "dayjs";

interface ViewPetProps {
    pet: Pet;
}

export function ViewPet({ pet }: ViewPetProps) {
    return (
        <div className="space-y-6">
            {/* SECCIÓN 1: INFORMACIÓN BÁSICA */}
            <FormSection
                title="Información General"
                subtitle="Datos principales e identificación de la mascota"
                icon="ti-paw"
            >
                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <DataDisplay label="Nombre" value={pet.name} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <DataDisplay label="Especie" value={pet.speciesName} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <DataDisplay
                            label="Razas"
                            value={
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {pet.breeds.length > 0 ? (
                                        pet.breeds.map((b) => <Badge key={b.id} variant="light" color="blue" size="sm">{b.name}</Badge>)
                                    ) : (
                                        <span className="text-slate-400 text-xs">Sin especificar</span>
                                    )}
                                </div>
                            }
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay label="Edad" value={`${pet.age} años`} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay label="Fecha de Nacimiento" value={dayjs(pet.birthDate).format("DD/MM/YYYY")} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay label="Género" value={<Badge variant="dot" color={pet.gender.value === "MALE" ? "blue" : "pink"}>{pet.gender.value}</Badge>} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay label="Tamaño" value={<Badge variant="filled" color="gray">{pet.size.value}</Badge>} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay label="Peso" value={`${pet.weightKg} kg`} />
                    </Grid.Col>
                </Grid>
            </FormSection>

            <FormSection
                title="Galería de Fotos"
                subtitle="Álbum de imágenes de la mascota registradas en el sistema"
                icon="ti-photo"
            >
                {pet.photoUrls && pet.photoUrls.length > 0 ? (
                    /* Reemplazamos la grilla nativa por nuestra molécula Slider */
                    <ImageSlider photos={pet.photoUrls} petName={pet.name} />
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <i className="ti ti-photo-off text-slate-300 text-3xl mb-2" />
                        <p className="text-sm text-slate-400 font-medium">Esta mascota aún no tiene fotos registradas</p>
                    </div>
                )}
            </FormSection>

            {/* SECCIÓN 2: ESTADO Y SALUD */}
            <FormSection
                title="Salud y Estado de Adopción"
                subtitle="Información médica actual e historial en el refugio"
                icon="ti-heart-medical"
            >
                <Grid >
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay
                            label="Estado"
                            value={<Badge color={pet.status.value === "AVAILABLE" ? "green" : "orange"}>{pet.status.value}</Badge>}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay
                            label="Esterilizado"
                            value={
                                <Badge color={pet.isSterilized ? "teal" : "red"} variant="light">
                                    {pet.isSterilized ? "Sí" : "No"}
                                </Badge>
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay
                            label="Vacunado"
                            value={
                                <Badge color={pet.isVaccinated ? "teal" : "red"} variant="light">
                                    {pet.isVaccinated ? "Sí" : "No"}
                                </Badge>
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <DataDisplay
                            label="¿Ya fue Adoptado?"
                            value={
                                <Badge color={pet.isAdopted ? "purple" : "gray"} variant="filled">
                                    {pet.isAdopted ? "Adoptado 🎉" : "En Espera"}
                                </Badge>
                            }
                        />
                    </Grid.Col>
                </Grid>
            </FormSection>

            {/* SECCIÓN 3: HISTORIAS Y RASGOS */}
            <FormSection
                title="Perfil Psicológico y Notas"
                subtitle="Personalidad y detalles del rescate"
                icon="ti-notes"
            >
                <Grid>
                    <Grid.Col span={12}>
                        <DataDisplay
                            label="Personalidad / Rasgos"
                            value={
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {pet.traits.length > 0 ? (
                                        pet.traits.map((t) => <Badge key={t.id} variant="outline" color="violet">{t.name}</Badge>)
                                    ) : (
                                        <span className="text-slate-400 text-xs">No se cargaron rasgos</span>
                                    )}
                                </div>
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <DataDisplay label="Descripción" value={<p className="text-slate-600 leading-relaxed text-justify">{pet.description}</p>} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <DataDisplay label="Historia del Rescate" value={<p className="text-slate-600 leading-relaxed text-justify italic">{pet.rescueStory}</p>} />
                    </Grid.Col>
                </Grid>
            </FormSection>

        </div>
    );
}