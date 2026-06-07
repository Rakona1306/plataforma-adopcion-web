import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { SearchSelect } from "@/components/organisms/search-select";
import {
  BreedCreateDto,
  breedCreateSchema,
} from "@/core/application/features/shelter/breeds/dtos/breed-create-dto.";
import { useCreateBreed } from "@/core/application/features/shelter/breeds/hooks/useCreateBreed";
import { useGetAllSpecie } from "@/core/application/features/shelter/species/hooks/useGetAllSpecie";
import { Specie } from "@/core/domain/models/shelter/specie";
import { Button } from "@mantine/core";

export function CreateBreedForm() {
  const { create, errorMessage, errorValidation, isPending } = useCreateBreed();
  const {  data, updateFilter, isLoading } = useGetAllSpecie();

  const initialValues: BreedCreateDto = {
    name: "",
    speciesId: "",
  };

  const handleSubmit = (values: BreedCreateDto) => {
    create(values);
  };

  return (
    <>
      <FormContainer<BreedCreateDto>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={breedCreateSchema}
        className="space-y-5"
      >
        {errorMessage && <Alert icon message={errorMessage} type="error" />}

        <Input
          name="name"
          label="Nombre"
          required
          error={errorValidation.name}
        />

        <SearchSelect<Specie>
          name="speciesId"
          displayField="name"
          valueField="id"
          label="Buscar Especie"
          className="w-full" // Responsive: completo en móvil, mitad en desktop
          options={data?.items || []}
          onSearch={(search) => updateFilter({ search })}
          isLoading={isLoading}
        />

        <Button type="submit" loading={isPending}>
          Crear
        </Button>
      </FormContainer>
    </>
  );
}
