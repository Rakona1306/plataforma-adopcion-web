import * as Yup from "yup";

export const vaccineUpdateSchema = Yup.object({
  name: Yup.string().required("Requerido"),
});

export type VaccineUpdateDto = Yup.InferType<typeof vaccineUpdateSchema>;