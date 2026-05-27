import * as Yup from "yup"

export const RoleCreateSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string(),
  notDelete: Yup.boolean().default(false),
  toDashboard: Yup.boolean().default(true),
  permissionIds: Yup.array().of(Yup.string())
})

export type RoleCreateDto = Yup.InferType<typeof RoleCreateSchema>