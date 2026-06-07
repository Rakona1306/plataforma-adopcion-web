import { Alert } from "@/components/atoms/alert"
import Input from "@/components/atoms/input"
import FormContainer from "@/components/molecules/form-container"
import { SpecieCreateDto, specieCreateSchema } from "@/core/application/features/shelter/species/dtos/specie-create-dto"
import { useCreateSpecie } from "@/core/application/features/shelter/species/hooks/useCreateSpecie"
import { Button } from "@mantine/core"

export function CreateSpecieForm() {

  const { create, isPending, errorMessage, errorValidation } = useCreateSpecie()

  const initialValues: SpecieCreateDto = {
    name: ""
  }

  const handleSubmit = (values: SpecieCreateDto) => {
    create(values);
  }

  return (
    <>
      <FormContainer<SpecieCreateDto>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={specieCreateSchema}
        className="space-y-5"
      >
        {errorMessage && <Alert icon message={errorMessage} type="error" />}

        <Input 
          name="name" 
          label="Nombre" 
          required
          error={errorValidation.name}
        />

        <Button type="submit" loading={isPending} >Crear</Button>
      </FormContainer>
    </>
  )
}