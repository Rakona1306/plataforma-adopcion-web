import { EditPetFormPage } from "@/features/shelter/pet/components/form/edit-pet-form";

export default async function EditPageNext({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;

  return (
    <>
      <EditPetFormPage id={id} />
    </>
  )
}