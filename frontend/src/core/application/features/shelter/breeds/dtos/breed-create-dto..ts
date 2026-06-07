import * as Yup from "yup";

export const breedCreateSchema = Yup.object().shape({
  name: Yup.string().required("Requerido"),
  speciesId: Yup.string().required("Requerido"),
});

export type BreedCreateDto = Yup.InferType<typeof breedCreateSchema>;