"use server";

import PetVaccineAssignPage from "@/_pages/dashboard/shelter/pet/pet-vaccine-assign.page";

export default async function PetVaccinePageNext({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <>
            {
                id && (
                    <PetVaccineAssignPage id={id} />
                )
            }
        </>
    )
}