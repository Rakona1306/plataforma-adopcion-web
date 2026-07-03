import * as Yup from "yup";

export const petCreateSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),

  description: Yup.string()
    .optional()
    .max(1000, "Máximo 1000 caracteres"),

  rescueStory: Yup.string()
    .optional()
    .max(2000, "Máximo 2000 caracteres"),

  birthDate: Yup.date()
    .required("La fecha de nacimiento es requerida"),

  weightKg: Yup.number()
    .required("El peso es requerido")
    .positive("El peso debe ser mayor a 0"),

  isVaccinated: Yup.boolean()
    .required("Debe indicar si está vacunado"),

  isRecommend: Yup.boolean()
    .required("Debe indicar si es recomendable para adopción"),

  isSterilized: Yup.boolean()
    .required("Debe indicar si está esterilizado"),

  gender: Yup.number()
    .oneOf([0, 1, 2], "Género inválido")
    .required("El género es requerido"),

  size: Yup.number()
    .oneOf([0, 1, 2, 3], "Tamaño inválido")
    .required("El tamaño es requerido"),

  status: Yup.number()
    .oneOf([0, 1, 2, 3, 4, 5], "Estado inválido")
    .required("El estado es requerido"),

  age: Yup.number()
    .required("La edad es requerida")
    .positive("La edad debe ser mayor a 0")
    .integer("La edad debe ser un número entero"),

  speciesId: Yup.string()
    .uuid("La especie seleccionada es inválida")
    .required("La especie es requerida"),

  breedIds: Yup.object({
    addIds: Yup.array()
      .of(Yup.string().uuid("Raza inválida").required())
      .default([]),

    removeIds: Yup.array()
      .of(Yup.string().uuid("Raza inválida").required())
      .default([]),
  }).required(),

  traitIds: Yup.object({
    addIds: Yup.array()
      .of(Yup.string().uuid("Caracteristic inválida").required())
      .default([]),

    removeIds: Yup.array()
      .of(Yup.string().uuid("Caracteristica inválida").required())
      .default([]),
  }).required()
});

export type PetCreateDto = Yup.InferType<
  typeof petCreateSchema
>;