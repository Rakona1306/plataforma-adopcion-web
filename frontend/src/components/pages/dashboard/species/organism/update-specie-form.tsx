import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { SpecieUpdateDto, specieUpdateSchema } from "@/core/application/features/shelter/species/dtos/specie-update-dto";
import { useUpdateSpecie } from "@/core/application/features/shelter/species/hooks/useUpdateSpecie";
import { Specie } from "@/core/domain/models/shelter/specie";
import { Button } from "@mantine/core";

export function UpdateSpecieForm({ specie }: { specie: Specie }) {

  const { update, isPending, errorMessage, errorValidation } = useUpdateSpecie();

  const initialValues: SpecieUpdateDto = {
    name: specie.name
  }

  const handleSubmit = (values: SpecieUpdateDto) => {
    update({ id: specie.id, dto: values });
  }

  return (
    <FormContainer<SpecieUpdateDto>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={specieUpdateSchema}
      className="space-y-5"
    >
      {errorMessage && <Alert icon message={errorMessage} type="error" />}

      <Input name="name" label="Nombre" required error={errorValidation.name} defaultValue={specie.name} />

      <Button type="submit" loading={isPending}>
        Actualizar
      </Button>
    </FormContainer>
  );
}
