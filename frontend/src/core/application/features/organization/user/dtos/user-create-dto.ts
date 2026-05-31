import * as Yup from "yup"

export const UserCreateSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El apellido es requerido"),
  email: Yup.string().email("El email es invalido").required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  dni: Yup.string(),
  ruc: Yup.string(),
  phone: Yup.string(),
  district: Yup.string().optional(),
  isBlocked: Yup.boolean().default(false),
  roleId: Yup.string().required("El rol es requerido"),
  document: Yup.string().optional()
})

export type UserCreateDto = Yup.InferType<typeof UserCreateSchema>