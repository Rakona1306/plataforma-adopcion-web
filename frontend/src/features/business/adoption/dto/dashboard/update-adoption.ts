
import * as Yup from "yup";

export const UpdateAdoptionSchema = Yup.object().shape({
    observations: Yup.string().optional(),
    status: Yup.number().required("El estado es requerido")
})

export type UpdateAdoptionDto = Yup.InferType<typeof UpdateAdoptionSchema>