import * as Yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const createPetPhotosSchema = Yup.object({
  files: Yup.array()
    .of(
      Yup.mixed<File>()
        .test(
          "fileType",
          "Solo se permiten imágenes JPG, JPEG, PNG o WEBP",
          (value) => {
            if (!value) return true;

            return [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/webp",
            ].includes(value.type);
          }
        )
        .test(
          "fileSize",
          "La imagen no debe superar los 5MB",
          (value) => {
            if (!value) return true;

            return value.size <= MAX_FILE_SIZE;
          }
        )
    )
    .default([]),

  isMainList: Yup.array()
    .of(Yup.string().uuid().required())
    .default([]),

  photoIdsToRemove: Yup.array()
    .of(
      Yup.string()
        .uuid("ID de foto inválido")
        .required()
    )
    .default([]),
});

export type SyncPetPhotosDto = Yup.InferType<
  typeof createPetPhotosSchema
>;