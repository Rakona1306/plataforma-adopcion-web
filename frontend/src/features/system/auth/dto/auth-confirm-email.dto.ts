
import * as Yup from "yup";

export const authConfirmEmailSchema = Yup.object().shape({
    email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es obligatorio"),
    code: Yup.string().required("El código es obligatorio").length(6, "El código debe tener 6 dígitos"),
});

export type AuthConfirmEmailDto = Yup.InferType<typeof authConfirmEmailSchema>;