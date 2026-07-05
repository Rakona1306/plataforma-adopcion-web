import * as yup from 'yup';

export enum RequestType {
    ADOPCION = 0,
    HOGAR_TEMPORAL = 1
}

export enum RequestStatus {
    PENDIENTE = 0,
    APROBADO = 1,
    RECHAZADO = 2
}

export const createReqAdoptionDetailSchema = yup.object({
    userId: yup
        .string()
        .uuid('El ID de usuario debe ser un UUID válido')
        .required('El usuario es requerido'),

    /*
    type: yup
        .mixed<RequestType>()
        .oneOf(Object.values(RequestType) as RequestType[], 'Tipo de solicitud inválido')
        .default(RequestType.ADOPCION),

    status: yup
        .mixed<RequestStatus>()
        .oneOf(Object.values(RequestStatus) as RequestStatus[], 'Estado de solicitud inválido')
        .default(RequestStatus.PENDIENTE),
    */
    motivation: yup
        .string()
        .trim()
        .required('La motivación es requerida')
        .min(10, 'Por favor, detalla un poco más tu motivación (mínimo 10 caracteres)'),

    district: yup
        .string()
        .trim()
        .required('El distrito es requerido'),

    phone: yup
        .string()
        .trim()
        .required('El teléfono es requerido')
        .matches(/^[0-9+-\s]{7,15}$/, 'Número de teléfono inválido'), // Validación estándar para teléfonos

    petId: yup
        .string()
        .uuid('El ID de la mascota debe ser un UUID válido')
        .required('La mascota es requerida (campo obligatorio)'),

    notes: yup
        .string()
        .trim()
        .nullable() // Soporta que sea null como el "string?" de C#
        .notRequired(),

    // ──────────────────── DATOS DE ADOPCIÓN ────────────────────
    houseType: yup
        .string()
        .trim()
        .required('El tipo de vivienda es requerido (ej: Casa, Departamento)'),

    hasOtherPets: yup
        .boolean()
        .required('Debes especificar si tienes otras mascotas'),

    hasChildren: yup
        .boolean()
        .required('Debes especificar si hay niños en casa'),

    acceptHomeVisit: yup
        .boolean()
        .oneOf([true, false])
        .required('Debes responder si aceptas la visita domiciliaria')
});

export type CreateReqAdoptionDetail = yup.InferType<typeof createReqAdoptionDetailSchema>;