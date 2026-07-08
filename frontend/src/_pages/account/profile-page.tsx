'use client'
import Title from "@/app/(web)/_components/atoms/title";
import Container from "@/components/atoms/container";
import { FormSection } from "@/components/atoms/form-section";
import usePaginateAdoptionRequest from "@/features/business/adoption/hooks/use-paginate-adoption-request";
import { useProfile } from "@/features/system/auth/hooks/useProfile";
import { Grid } from "@mantine/core";
import { BiUser } from "react-icons/bi";

export default function ProfilePage() {

    const { profile } = useProfile()
    const { data: adoptionRequests } = usePaginateAdoptionRequest({
        filter: {
            userId: profile?.id,
            page: 1,
            pageSize: 10,
            status: 3
        },
        queryOptions: {
            enabled: !!profile?.id
        }
    })

    console.log("adoptionRequests", adoptionRequests)

    return (
        <Container className="pt-10 pb-20 space-y-5">
            <Title htmlTag="h1" className="xl:text-5xl text-center">
                Mi Informacion
            </Title>

            <FormSection
                title="Datos Generales"
                subtitle="Aqui se encontraran sus datos generales"
                icon={<BiUser />}
            >
                <Grid>
                    <Grid.Col span={{ md: 6, base: 12 }}>
                        <p className="text-gray-500 text-sm">Nombre: </p>
                        <p className="font-medium">{profile?.name}</p>
                    </Grid.Col>
                    <Grid.Col span={{ md: 6, base: 12 }}>
                        <p className="text-gray-500 text-sm">Apellido: </p>
                        <p className="font-medium">{profile?.lastName}</p>
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={{ md: 6, base: 12 }}>
                        <p className="text-gray-500 text-sm">Rol: </p>
                        <p className="font-medium">{profile?.role?.name || '-'}</p>
                    </Grid.Col>
                    <Grid.Col span={{ md: 6, base: 12 }}>
                        <p className="text-gray-500 text-sm">Correo Electrónico: </p>
                        <p className="font-medium">{profile?.email || '-'}</p>
                    </Grid.Col>
                </Grid>
            </FormSection>

            <FormSection
                title="Datos Especificas"
                subtitle="Aqui se encontraran sus datos generales"
                icon={<BiUser />}
            >
                <Grid>
                    <Grid.Col span={{ md: 6, base: 12 }}>
                        <p className="text-gray-500 text-sm">DNI: </p>
                        <p className="font-medium">{profile?.dni || '-'}</p>
                    </Grid.Col>
                    <Grid.Col span={{ md: 6, base: 12 }}>
                        <p className="text-gray-500 text-sm">Distrito: </p>
                        <p className="font-medium">{profile?.district || '-'}</p>
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={{ md: 6, base: 12 }}>
                        <p className="text-gray-500 text-sm">Teléfono: </p>
                        <p className="font-medium">{profile?.phone || '-'}</p>
                    </Grid.Col>
                </Grid>
            </FormSection>

            <FormSection
                title="Mascotas Adoptadas"
                subtitle="Aqui se encontraran sus datos generales"
                icon={<BiUser />}
            >
                Nombre
            </FormSection>

            <FormSection
                title="Mascotas Apadrinadas"
                subtitle="Aqui se encontraran sus datos generales"
                icon={<BiUser />}
            >
                Nombre
            </FormSection>
        </Container>
    )
}