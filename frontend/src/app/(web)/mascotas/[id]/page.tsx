"use server"

import PetDeatilPage from "@/components/pages/web/mascotas/pdp-page"


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const petId = Number(id)

  return (
    <div className="pt-20 bg-gray-100">
      <PetDeatilPage petId={petId} />
    </div>
  )
}