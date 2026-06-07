import * as Yup from "yup";

export const specieCreateSchema = Yup.object({
  name: Yup.string().required("Requerido"),
});

export type SpecieCreateDto = Yup.InferType<typeof specieCreateSchema>;