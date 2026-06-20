"use server";

import PetViewPage from "@/_pages/dashboard/shelter/pet/pet-view-page";

export default async function ViewPageNext({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    return (
        <>
            <PetViewPage id={id} />
        </>
    )
}