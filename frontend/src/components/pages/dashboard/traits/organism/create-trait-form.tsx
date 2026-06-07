import { Alert } from "@/components/atoms/alert"
import Input from "@/components/atoms/input"
import FormContainer from "@/components/molecules/form-container"
import { specieCreateSchema } from "@/core/application/features/shelter/species/dtos/specie-create-dto"
import { useCreateSpecie } from "@/core/application/features/shelter/species/hooks/useCreateSpecie"
import { TraitCreateDto } from "@/core/application/features/shelter/traits/dto/trait-create-dto"
import { useCreateTrait } from "@/core/application/features/shelter/traits/hooks/useCreateTrait"
import { Button } from "@mantine/core"

export function CreateTraitForm() {

  const { create, isPending, errorMessage, errorValidation } = useCreateTrait()

  const initialValues: TraitCreateDto = {
    name: ""
  }

  const handleSubmit = (values: TraitCreateDto) => {
    create(values);
  }

  return (
    <>
      <FormContainer<TraitCreateDto>
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