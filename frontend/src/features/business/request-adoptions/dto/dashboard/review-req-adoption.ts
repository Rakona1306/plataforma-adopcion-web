import * as Yup from 'yup'


export const ReviewReqAdoptionSchema = Yup.object().shape({
    id: Yup.number().required("El ID de la solicitud es obligatorio"),
    status: Yup.number().required("El estado de la solicitud es obligatorio"),
    reviewComment: Yup.string().required("El comentario de revisión es obligatorio"),
})

export type ReviewReqAdoptionDto = Yup.InferType<typeof ReviewReqAdoptionSchema>