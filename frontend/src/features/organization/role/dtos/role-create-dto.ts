import * as Yup from "yup"

export const RoleCreateSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string(),
  notDelete: Yup.boolean().default(false),
  toDashboard: Yup.boolean().default(true),
  currentPermissions: Yup.array().of(Yup.string().required("El permiso es requerido")),
})

export type RoleCreateDto = Yup.InferType<typeof RoleCreateSchema>