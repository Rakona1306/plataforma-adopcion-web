"use server"

import { PetDeatilPage } from "@/_pages/web/mascotas/pdp-page"


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  return (
    <div className="pt-20 bg-gray-100">
      <PetDeatilPage slug={id} />
    </div>
  )
}