import * as Yup from "yup";

export const traitUpdateSchema = Yup.object({
  name: Yup.string().required("Requerido"),
});

export type TraitUpdateDto = Yup.InferType<typeof traitUpdateSchema>;