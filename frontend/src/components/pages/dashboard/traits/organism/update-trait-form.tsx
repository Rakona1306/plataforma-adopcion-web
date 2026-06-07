import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { useUpdateSpecie } from "@/core/application/features/shelter/species/hooks/useUpdateSpecie";
import { TraitUpdateDto, traitUpdateSchema } from "@/core/application/features/shelter/traits/dto/trait-update-dto";
import { useUpdateTrait } from "@/core/application/features/shelter/traits/hooks/useUpdateTrait";
import { Trait } from "@/core/domain/models/shelter/trait";
import { Button } from "@mantine/core";

export function UpdateTraitForm({ trait }: { trait: Trait }) {

  const { update, isPending, errorMessage, errorValidation } = useUpdateTrait();
  
  const initialValues: TraitUpdateDto = {
    name: trait.name
  }

  const handleSubmit = (values: TraitUpdateDto) => {
    update({ id: trait.id, dto: values });
  }

  return (
    <FormContainer<TraitUpdateDto>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={traitUpdateSchema}
      className="space-y-5"
    >
      {errorMessage && <Alert icon message={errorMessage} type="error" />}

      <Input name="name" label="Nombre" required error={errorValidation.name} />

      <Button type="submit" loading={isPending}>
        Actualizar
      </Button>
    </FormContainer>
  );
}
