"use client"
import FormContainer from "@/components/molecules/form-container";
import { useCreatePetPhotos } from "../../hooks/useCreatePetPhoto";
import {
  createPetPhotosSchema,
  SyncPetPhotosDto,
} from "../../dto/create-pet-photo.dto";
import { FileUpload } from "@/components/atoms/file-upload";
import { Button, Skeleton } from "@mantine/core";
import { useGetAllPetPhoto } from "../../hooks/useGetAllPetPhoto";

export function CreatePetPhotoForm({ petId }: { petId: string }) {
  const { create, isPending } = useCreatePetPhotos();
  const { data: petPhotos, isLoading } = useGetAllPetPhoto(petId);

  const initialValues: SyncPetPhotosDto = {
    files: [],
    isMainList: [],
    photoIdsToRemove: [],
  };

  const onSubmit = (values: SyncPetPhotosDto) => {
    console.log(values, petId);
    create({ dto: values, petId });
  };

  return (
    <FormContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={createPetPhotosSchema}
      className="space-y-5"
    >
      {({ errors }) => (
        <>
          {isLoading ? (
            <Skeleton width='100%' height='10rem' />
          ) : (
            <>
              <FileUpload
                name="files"
                removeFieldName="photoIdsToRemove"
                mainFieldName="isMainList"
                defaultPhotos={petPhotos?.items || []} // PetPhoto[] de la API
                label="Imágenes"
                required
                maxFiles={10}
              />
              {errors.files && (
                <p className="text-red-500 text-sm">{errors.files}</p>
              )}
            </>
          )}

          <Button type="submit" loading={isPending} disabled={isPending}>
            Asignar imágenes
          </Button>
        </>
      )}
    </FormContainer>
  );
}
