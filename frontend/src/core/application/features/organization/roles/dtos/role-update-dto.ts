import * as Yup from "yup"

export const RoleUpdateSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string(),
  notDelete: Yup.boolean().default(false),
  toDashboard: Yup.boolean().default(true),

  currentPermissions: Yup.array().of(Yup.string()),
  permissionsToAdd: Yup.array().of(Yup.string()),
  permissionsToRemove: Yup.array().of(Yup.string()),
})

export type RoleUpdateDto = Yup.InferType<typeof RoleUpdateSchema>