import * as yup from "yup";

export enum RequestType {
  ADOPCION = 0,
  HOGAR_TEMPORAL = 1,
}

export enum RequestStatus {
  PENDIENTE = 0,
  APROBADO = 1,
  RECHAZADO = 2,
}

const phoneRegExp = /^(\+?\d{1,3}[- ]?)?\d{7,15}$/;

export const createPubRequestAdoptionSchema = yup.object({
  motivation: yup
    .string()
    .trim()
    .required("La motivación es requerida")
    .min(
      10,
      "Por favor, detalla un poco más tu motivación (mínimo 10 caracteres)",
    )
    .max(255, "La motivación no puede exceder los 255 caracteres"),

  district: yup.string().trim().required("El distrito es requerido"),

  dni: yup
    .string()
    .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos")
    .required("El DNI es obligatorio"),

  phone: yup
    .string()
    .matches(phoneRegExp, "Ingresa un número de teléfono válido")
    .max(15, "El teléfono no puede exceder los 15 caracteres")
    .required("El número de teléfono es obligatorio"), // Validación estándar para teléfonos

  petId: yup
    .string()
    .uuid("El ID de la mascota debe ser un UUID válido")
    .required("La mascota es requerida (campo obligatorio)"),

  notes: yup
    .string()
    .trim()
    .nullable() // Soporta que sea null como el "string?" de C#
    .notRequired(),

  // ──────────────────── DATOS DE ADOPCIÓN ────────────────────
  houseType: yup
    .string()
    .trim()
    .required("El tipo de vivienda es requerido (ej: Casa, Departamento)"),

  hasOtherPets: yup
    .boolean()
    .required("Debes especificar si tienes otras mascotas"),

  hasChildren: yup.boolean().required("Debes especificar si hay niños en casa"),

  acceptHomeVisit: yup
    .boolean()
    .oneOf([true, false])
    .required("Debes responder si aceptas la visita domiciliaria"),

  address: yup
    .string()
    .trim()
    .required("La dirección es requerida")
    .min(
      10,
      "Por favor, proporciona una dirección más detallada (mínimo 10 caracteres)",
    ),
});

export type CreatePubReqAdoption = yup.InferType<
  typeof createPubRequestAdoptionSchema
>;
