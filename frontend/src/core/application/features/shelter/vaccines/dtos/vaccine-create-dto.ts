import * as Yup from "yup";

export const vaccineCreateSchema = Yup.object({
  name: Yup.string().required("Requerido"),
});

export type VaccineCreateDto = Yup.InferType<typeof vaccineCreateSchema>;