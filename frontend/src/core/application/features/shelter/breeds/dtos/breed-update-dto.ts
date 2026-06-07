import * as Yup from "yup";

export const breedUpdateSchema = Yup.object().shape({
  name: Yup.string().required("Requerido"),
  speciesId: Yup.string().required("Requerido"),
});

export type BreedUpdateDto = Yup.InferType<typeof breedUpdateSchema>;