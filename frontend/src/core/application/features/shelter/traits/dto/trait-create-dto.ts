import * as Yup from "yup";

export const traitCreateSchema = Yup.object({
  name: Yup.string().required("Requerido"),
});

export type TraitCreateDto = Yup.InferType<typeof traitCreateSchema>;