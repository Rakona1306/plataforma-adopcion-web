import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { SearchSelect } from "@/components/organisms/search-select";
import {
  BreedUpdateDto,
  breedUpdateSchema,
} from "@/core/application/features/shelter/breeds/dtos/breed-update-dto";
import { useUpdateBreed } from "@/core/application/features/shelter/breeds/hooks/useUpdateBreed";
import { useGetAllSpecie } from "@/core/application/features/shelter/species/hooks/useGetAllSpecie";
import { Breed } from "@/core/domain/models/shelter/breed";
import { Specie } from "@/core/domain/models/shelter/specie";
import { Button } from "@mantine/core";

export function UpdateBreedForm({ breed }: { breed: Breed }) {
  const { update, errorMessage, errorValidation, isPending } = useUpdateBreed();
  const { data, updateFilter, isLoading } = useGetAllSpecie();

  const initialValues: BreedUpdateDto = {
    name: breed.name,
    speciesId: breed.speciesId,
  };

  const handleSubmit = (values: BreedUpdateDto) => {
    update({ id: breed.id, dto: values });
  };

  return (
    <>
      <FormContainer<BreedUpdateDto>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={breedUpdateSchema}
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
          defaultValue={breed.speciesName}
        />

        <Button type="submit" loading={isPending}>
          Actualizar
        </Button>
      </FormContainer>
    </>
  );
}
