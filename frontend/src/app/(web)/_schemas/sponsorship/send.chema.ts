import * as yup from "yup";

export const sendSponsorshipSchema = yup.object({
  name: yup.string().required("Requerido"),
  email: yup.string().email("Email no válido").required("Requerido"),
  amount: yup.number().required("Requerido"),
  pet: yup.number().required("Requerido"),
  petName: yup.string().required("Requerido"),
  celular: yup.string().required("Requerido"),
  message: yup.string().optional(),
  method: yup.string().required("Requerido"),
});