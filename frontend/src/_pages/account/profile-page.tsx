import Title from "@/app/(web)/_components/atoms/title";
import Container from "@/components/atoms/container";
import { FormSection } from "@/components/atoms/form-section";
import { BiUser } from "react-icons/bi";

export default function ProfilePage() {
    return (
        <Container className="pt-10 pb-20 space-y-10">
            <Title htmlTag="h1" className="xl:text-5xl text-center">
                Mi Informacion
            </Title>

            <FormSection
                title="Datos Generales"
                subtitle="Aqui se encontraran sus datos generales"
                icon={<BiUser />}
            >
                Nombre
            </FormSection>

            <FormSection
                title="Datos Especificas"
                subtitle="Aqui se encontraran sus datos generales"
                icon={<BiUser />}
            >
                Nombre
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