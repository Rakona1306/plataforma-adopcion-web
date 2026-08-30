import * as Yup from "yup";

const phoneRegExp = /^(\+?\d{1,3}[- ]?)?\d{7,15}$/;

export const CreateRequestAdoptionSchema = Yup.object().shape({
  petId: Yup.string()
    .uuid("El ID de la mascota debe ser un GUID válido")
    .required("El ID de la mascota es obligatorio"),

  userId: Yup.string()
    .uuid("El ID del usuario debe ser un GUID válido")
    .required("El ID del usuario es obligatorio"),

  houseType: Yup.string()
    .max(50, "El tipo de vivienda no puede exceder los 50 caracteres")
    .required("El tipo de vivienda es obligatorio"),

  hasOtherPets: Yup.boolean().default(false),

  hasChildren: Yup.boolean().default(false),

  acceptHomeVisit: Yup.boolean()
    .oneOf([true], "Debes aceptar la visita domiciliaria para continuar")
    .default(false),

  district: Yup.string()
    .max(100, "El distrito no puede exceder los 100 caracteres")
    .required("El distrito es obligatorio"),

  address: Yup.string().optional(),

  reference: Yup.string().nullable().notRequired(),

  dni: Yup.string()
    .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos")
    .required("El DNI es obligatorio"),

  phone: Yup.string()
    .matches(phoneRegExp, "Ingresa un número de teléfono válido")
    .max(15, "El teléfono no puede exceder los 15 caracteres")
    .required("El número de teléfono es obligatorio"),

  motivation: Yup.string()
    .max(2000, "La motivación no puede exceder los 2000 caracteres")
    .required("La motivación o motivo de adopción es obligatorio"),
});

// Opcional: Tipo inferido directamente desde el esquema de Yup
export type CreateRequestAdoptionDto = Yup.InferType<
  typeof CreateRequestAdoptionSchema
>;
