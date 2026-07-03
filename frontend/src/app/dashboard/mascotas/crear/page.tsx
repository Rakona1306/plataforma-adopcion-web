"use client";

import FormContainer from "@/components/molecules/form-container";
import BodyDashboard from "../../_components/molecules/body-dashboard";
import HeaderDashboard from "../../_components/molecules/header-dashboard";
import Input from "@/components/atoms/input";
import {
  PetCreateDto,
  petCreateSchema,
} from "@/core/application/features/shelter/pets/dtos/pet-create-dto";
import { SearchSelect } from "@/components/organisms/search-select";
import { ChipField } from "@/components/atoms/chip-field";
import { FormSection } from "@/components/atoms/form-section";
import { TraitsPicker } from "@/components/atoms/trait-picker";
import Textarea from "@/components/atoms/text-area";
import { ToggleField } from "@/components/atoms/toggle-field";
import { useGetAllSpecie } from "@/core/application/features/shelter/species/hooks/useGetAllSpecie";
import { useGetAllBreed } from "@/core/application/features/shelter/breeds/hooks/useGetAllBreed";
import { MultiSearchSelect } from "@/components/atoms/multi-search-select";
import { useGetAllTrait } from "@/core/application/features/shelter/traits/hooks/useGetAllTrait";
import { useGetPetSizes } from "@/features/system/enums/pet-sizes/hooks/useGetPetSizes";
import { useGetAllPetGenders } from "@/features/system/enums/pet-genders/hooks/useGetAllPetGenders";
import { useGetAllPetStatus } from "@/features/system/enums/pet-status/hooks/useGetAllPetStatus";
import { useCreatePet } from "@/core/application/features/shelter/pets/hooks/useCreatePet";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function CreatePetPageNext() {
  const { data, updateFilter } = useGetAllSpecie();
  const { data: breeds, updateFilter: updateBreedFilter } = useGetAllBreed();
  const { data: traits, isLoading: traitsLoading } = useGetAllTrait();
  const { data: petSizes } = useGetPetSizes();
  const { data: petStatus } = useGetAllPetStatus();
  const { data: petGenders } = useGetAllPetGenders();
  const { create } = useCreatePet()
  const router = useRouter()

  const initialValues: PetCreateDto = {
    name: "",
    description: "",
    rescueStory: "",
    birthDate: new Date(),
    weightKg: 0,
    isVaccinated: false,
    isSterilized: false,
    isRecommend: false,
    gender: 1,
    size: 1,
    status: 1,
    speciesId: "",
    breedIds: {
      addIds: [],
      removeIds: []
    },
    traitIds: {
      addIds: [],
      removeIds: []
    },
    age: 0,
  };

  const onSubmit = (values: PetCreateDto) => {
    console.log(values)
    create(values)
  };

  const handleBackButton = () => {
    router.push("/dashboard/mascotas");
  };

  return (
    <>
      <HeaderDashboard>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          Crear mascota
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Registra una nueva mascota en el albergue
        </p>
      </HeaderDashboard>

      <BodyDashboard>
        <FormContainer
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={petCreateSchema}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <div className="flex flex-col gap-4">
              {/* ── Información básica ── */}
              <FormSection
                icon="ti-id-badge"
                title="Información básica"
                subtitle="Datos principales de la mascota"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    label="Nombre"
                    placeholder="Ej: Luna, Max, Milo..."
                    required
                  />
                  <Input
                    name="age"
                    label="Edad"
                    type="number"
                    placeholder="Ej: 2, 5, 10..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SearchSelect
                    name="speciesId"
                    label="Especie"
                    options={data?.items || []} // reemplaza con tu hook de especies
                    displayField="name"
                    valueField="id"
                    placeholder="Buscar especie..."
                    onSearch={(value) => updateFilter({ search: value })}
                  />
                  <MultiSearchSelect
                    name="breedIds"
                    label="Raza(s)"
                    options={breeds?.items || []}
                    displayField="name"
                    valueField="id"
                    placeholder="Buscar raza..."
                    onSearch={(value) => updateBreedFilter({ search: value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ChipField
                    label="Género"
                    options={petGenders || []}
                    labelKey="value"
                    valueKey="key"
                    value={values.gender}
                    onChange={(v) => setFieldValue("gender", v)}
                    error={touched.gender ? errors.gender : undefined}
                    required
                  />
                  <ChipField
                    label="Tamaño"
                    options={petSizes || []}
                    labelKey="value"
                    valueKey="key"
                    value={values.size}
                    onChange={(v) => setFieldValue("size", v)}
                    error={touched.size ? errors.size : undefined}
                    required
                  />
                  <ChipField
                    label="Estado"
                    options={petStatus || []}
                    labelKey="value"
                    valueKey="key"
                    value={values.status}
                    onChange={(v) => setFieldValue("status", v)}
                    error={touched.status ? errors.status : undefined}
                    required
                  />
                </div>
              </FormSection>

              {/* ── Salud y físico ── */}
              <FormSection
                icon="ti-stethoscope"
                title="Datos de salud y físicos"
                subtitle="Información médica y características físicas"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="birthDate"
                    label="Fecha de nacimiento"
                    type="date"
                    required
                  />
                  <Input
                    name="weightKg"
                    label="Peso (kg)"
                    type="number"
                    placeholder="Ej: 4.5"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ToggleField
                    label="Vacunado"
                    subtitle="¿Tiene todas las vacunas al día?"
                    value={values.isVaccinated}
                    onChange={(v) => setFieldValue("isVaccinated", v)}
                  />
                  <ToggleField
                    label="Esterilizado"
                    subtitle="¿Ha sido esterilizado/castrado?"
                    value={values.isSterilized}
                    onChange={(v) => setFieldValue("isSterilized", v)}
                  />
                  <ToggleField
                    label="Recomendable para adopción"
                    subtitle="¿Es recomendable para adopción?"
                    value={values.isRecommend}
                    onChange={(v) => setFieldValue("isRecommend", v)}
                  />
                </div>
              </FormSection>

              {/* ── Características ── */}
              <FormSection
                icon="ti-sparkles"
                title="Características y personalidad"
                subtitle="Rasgos que describen a la mascota (opcional)"
              >
                <TraitsPicker
                  name="traitIds"
                  traits={traits?.items || []}
                  isLoading={traitsLoading}
                />
              </FormSection>

              {/* ── Descripción e historia ── */}
              <FormSection
                icon="ti-writing"
                title="Descripción e historia"
                subtitle="Textos que se mostrarán en el perfil público"
              >
                <Textarea
                  name="description"
                  label="Descripción"
                  placeholder="Describe la personalidad, comportamiento y características..."
                  rows={4}
                  helperText="Se mostrará en el perfil de adopción"
                />
                <Textarea
                  name="rescueStory"
                  label="Historia de rescate"
                  placeholder="Cuéntanos cómo llegó al albergue y el proceso de rescate..."
                  rows={5}
                  helperText="Ayuda a generar empatía con posibles adoptantes"
                />
              </FormSection>

              {/* ── Footer ── */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  color="gray"
                  classNames={{
                    root: 'bg-gray-500!'
                  }}
                  onClick={handleBackButton}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Crear mascota
                </Button>
              </div>
            </div>
          )}
        </FormContainer>
      </BodyDashboard>
    </>
  );
}
