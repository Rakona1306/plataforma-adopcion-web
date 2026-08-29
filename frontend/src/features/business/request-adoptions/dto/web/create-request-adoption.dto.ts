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

export const createRequestAdoptionSchema = yup.object({
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
        .required('Debes responder si aceptas la visita domiciliaria'),

    address: yup
        .string()
        .trim()
        .required('La dirección es requerida')
        .min(10, 'Por favor, proporciona una dirección más detallada (mínimo 10 caracteres)')
});

export type CreateReqAdoption = yup.InferType<typeof createRequestAdoptionSchema>;