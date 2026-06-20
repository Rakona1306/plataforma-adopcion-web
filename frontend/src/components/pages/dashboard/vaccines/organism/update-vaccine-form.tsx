import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { VaccineUpdateDto, vaccineUpdateSchema } from "@/core/application/features/shelter/vaccines/dtos/vaccine-update-dto";
import { useUpdateVaccine } from "@/core/application/features/shelter/vaccines/hooks/useUpdateVaccine";
import { Vaccine } from "@/core/domain/models/shelter/vaccine";
import { Button } from "@mantine/core";

export function UpdateVaccineForm({ vaccine }: { vaccine: Vaccine }) {

  const { isPending, errorMessage, errorValidation, update } = useUpdateVaccine();

  const initialValues: VaccineUpdateDto = {
    name: vaccine.name,
  };

  const handleSubmit = (values: VaccineUpdateDto) => {
    update({ dto: values, id: vaccine.id });
  };

  return (
    <>
      <FormContainer<VaccineUpdateDto>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={vaccineUpdateSchema}
        className="space-y-5"
      >
        {errorMessage && <Alert icon message={errorMessage} type="error" />}

        <Input
          name="name"
          label="Nombre"
          required
          error={errorValidation.name}
          defaultValue={vaccine.name}
        />

        <Button type="submit" loading={isPending}>
          Actualizar
        </Button>
      </FormContainer>
    </>
  );
}
