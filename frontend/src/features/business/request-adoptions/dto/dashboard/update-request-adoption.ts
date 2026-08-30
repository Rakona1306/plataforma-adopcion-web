import * as Yup from "yup";

const phoneRegExp = /^(\+?\d{1,3}[- ]?)?\d{7,15}$/;

export const UpdateRequestAdoptionSchema = Yup.object().shape({
  id: Yup.number()
    .integer("El ID debe ser un número entero")
    .positive("El ID debe ser válido")
    .required("El ID de la solicitud es obligatorio"),

  houseType: Yup.string()
    .max(50, "El tipo de vivienda no puede exceder los 50 caracteres")
    .required("El tipo de vivienda es obligatorio"),

  hasOtherPets: Yup.boolean().default(false),

  hasChildren: Yup.boolean().default(false),

  acceptHomeVisit: Yup.boolean()
    .oneOf([true], "Debes aceptar la visita domiciliaria para continuar")
    .default(false),

  dni: Yup.string()
    .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos")
    .required("El DNI es obligatorio"),

  address: Yup.string().required("La dirección es obligatoria"),

  reference: Yup.string().nullable().notRequired(),

  district: Yup.string()
    .max(100, "El distrito no puede exceder los 100 caracteres")
    .required("El distrito es obligatorio"),

  phone: Yup.string()
    .matches(phoneRegExp, "Ingresa un número de teléfono válido")
    .max(15, "El teléfono no puede exceder los 15 caracteres")
    .required("El número de teléfono es obligatorio"),

  motivation: Yup.string()
    .max(2000, "La motivación no puede exceder los 2000 caracteres")
    .required("La motivación es obligatoria"),
});

// Tipo inferido para formularios
export type UpdateRequestAdoptionDto = Yup.InferType<
  typeof UpdateRequestAdoptionSchema
>;
