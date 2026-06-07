import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Email requerido"),

  password: Yup.string()
    .required("Contraseña requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(
      /[^A-Za-z0-9]/,
      "Debe contener al menos un carácter especial"
    ),

  confirmPassword: Yup.string()
    .required("Confirmar contraseña requerida")
    .oneOf(
      [Yup.ref("password")],
      "Las contraseñas no coinciden"
    ),
});

export type ChangePasswordDto = Yup.InferType<
  typeof changePasswordSchema
>;