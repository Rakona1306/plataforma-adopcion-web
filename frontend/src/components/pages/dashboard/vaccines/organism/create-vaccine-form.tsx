import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { VaccineCreateDto, vaccineCreateSchema } from "@/core/application/features/shelter/vaccines/dtos/vaccine-create-dto";
import { useCreateVaccine } from "@/core/application/features/shelter/vaccines/hooks/useCreateVaccine";
import { Button } from "@mantine/core";

export function CreateVaccineForm() {
  const { create, errorMessage, errorValidation, isPending } = useCreateVaccine();
  
  const initialValues: VaccineCreateDto = {
    name: "",
  };

  const handleSubmit = (values: VaccineCreateDto) => {
    create(values);
  }

  return (
    <>
      <FormContainer<VaccineCreateDto>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={vaccineCreateSchema}
        className="space-y-5"
      >
        {errorMessage && <Alert icon message={errorMessage} type="error" />}

        <Input
          name="name"
          label="Nombre"
          required
          error={errorValidation.name}
        />

        <Button type="submit" loading={isPending}>
          Crear
        </Button>
      </FormContainer>
    </>
  );
}
