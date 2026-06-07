import * as Yup from "yup"

export const UserUpdateSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El apellido es requerido"),
  
  email: Yup.string().email("El email es invalido").required("El email es requerido"),
  dni: Yup.string(),
  ruc: Yup.string(),
  phone: Yup.string().optional(),
  district: Yup.string().optional(),
  isBlocked: Yup.boolean().default(false),
  roleId: Yup.string().required("El rol es requerido"),
})

export type UserUpdateDto = Yup.InferType<typeof UserUpdateSchema>