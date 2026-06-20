import * as Yup from "yup";

export const specieUpdateSchema = Yup.object({
  name: Yup.string().required("Requerido"),
});

export type SpecieUpdateDto = Yup.InferType<typeof specieUpdateSchema>;