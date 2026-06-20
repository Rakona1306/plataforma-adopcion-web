"use client";

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard";
import { ViewPet } from "@/features/shelter/pet/components/view-pet";
import { useGetByIdPet } from "@/features/shelter/pet/hooks/useGetByIdPet";

interface Props {
    id: string
}

export default function PetViewPage({ id }: Props) {

    const { data } = useGetByIdPet(id)

    return (
        <BodyDashboard>
            {
                data ? (
                    <ViewPet pet={data} />
                ) : (
                    <>Cargando...</>
                )
            }
        </BodyDashboard>
    )
}