'use client'

import HeaderDashboard from "../../_components/molecules/header-dashboard"
import BodyDashboard from "../../_components/molecules/body-dashboard"
import { Grid } from "@mantine/core"
import useGetByIdAdoption from "@/features/business/adoption/hooks/use-get-by-id-adoption"
import { FormSection } from "@/components/atoms/form-section"
import { BarChart, User } from "lucide-react"
import { MdPets } from "react-icons/md"
import PieChartWithCustomizedLabel from "@/components/molecules/charts/pie-chart/pie-chart-with-customized-label"
import SectionName from "@/components/atoms/sections/section-name"

export default function AdoptionDetailNextPage() {
    const { data, id, isLoading, isError } = useGetByIdAdoption()

    if (isError) return null

    const { requestAdoption } = data || {}

    const { user, pet } = requestAdoption || {}

    return (
        <div>
            <HeaderDashboard>
                <h1 className="text-lg md:text-2xl font-bold text-slate-800">
                    Ver Detalles de la Adopcion
                </h1>
            </HeaderDashboard>
            {
                isLoading || !data ? (
                    <>Cargando...</>
                ) : (
                    <BodyDashboard className="space-y-5">
                        <Grid>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <FormSection
                                    icon={<User size={26} className="text-terciary" />}
                                    title="Datos del Cliente"
                                    subtitle=""
                                    iconContainerClassName="bg-primary"
                                >
                                    <Grid>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Nombre Completo" value={`${user?.name} ${user?.lastName}`} />
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="DNI" value={user?.dni} />
                                        </Grid.Col>
                                    </Grid>

                                    <Grid>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Email" value={user?.email} />
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Distrito" value={user?.district} />
                                        </Grid.Col>
                                    </Grid>

                                    <Grid>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Celular" value={user?.phone} />
                                        </Grid.Col>
                                    </Grid>
                                </FormSection>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <FormSection
                                    icon={<MdPets size={26} className="text-terciary" />}
                                    title="Datos de la Mascota Adoptada"
                                    subtitle=""
                                    iconContainerClassName="bg-primary"
                                >
                                    <Grid gap={'md'}>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Nombre" value={`${pet?.name}`} />
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Tamaño" value={`${pet?.size}`} />
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Género" value={`${pet?.gender}`} />
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Edad" value={`${pet?.age}`} />
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                            <SectionName label="Especie" value={`${pet?.species.name}`} />
                                        </Grid.Col>
                                    </Grid>
                                </FormSection>
                            </Grid.Col>
                        </Grid >

                        <FormSection
                            icon={<BarChart size={26} className="text-terciary" />}
                            title="Reportes"
                            subtitle="Aca veras graficas sobre la adopcion"
                            iconContainerClassName="bg-primary"
                        >
                            <Grid gap={'md'} justify="center">
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <PieChartWithCustomizedLabel
                                        isAnimationActive={false}
                                        title="Grafica de Observaciones"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <PieChartWithCustomizedLabel
                                        isAnimationActive={false}
                                        title="Grafica de Observaciones 2"
                                    />
                                </Grid.Col>
                            </Grid>
                        </FormSection>

                        <FormSection
                            icon={<User size={26} className="text-terciary" />}
                            title="Observaciones"
                            subtitle=""
                            iconContainerClassName="bg-primary"
                        >
                            Hola
                        </FormSection>

                    </BodyDashboard>
                )
            }
        </div >
    )
}