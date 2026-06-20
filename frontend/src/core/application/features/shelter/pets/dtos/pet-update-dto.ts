import * as Yup from "yup";

export const petUpdateSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),

  description: Yup.string()
    .required("La descripción es requerida")
    .max(1000, "Máximo 1000 caracteres"),

  rescueStory: Yup.string()
    .required("La historia de rescate es requerida")
    .max(2000, "Máximo 2000 caracteres"),

  birthDate: Yup.date()
    .required("La fecha de nacimiento es requerida"),

  weightKg: Yup.number()
    .required("El peso es requerido")
    .positive("El peso debe ser mayor a 0"),

  isVaccinated: Yup.boolean()
    .required("Debe indicar si está vacunado"),

  isSterilized: Yup.boolean()
    .required("Debe indicar si está esterilizado"),

  isAdopted: Yup.boolean()
    .required("Debe indicar si fue adoptado"),

  gender: Yup.number()
    .oneOf([1, 2], "Género inválido")
    .required("El género es requerido"),

  size: Yup.number()
    .oneOf([1, 2, 3], "Tamaño inválido")
    .required("El tamaño es requerido"),

  age: Yup.number()
    .required("La edad es requerida")
    .positive("La edad debe ser mayor a 0")
    .integer("La edad debe ser un número entero"),

  status: Yup.number()
    .oneOf([1, 2, 3, 4, 5, 6], "Estado inválido")
    .required("El estado es requerido"),

  speciesId: Yup.string()
    .uuid("La especie seleccionada es inválida")
    .required("La especie es requerida"),

  breeds: Yup.object({
    addIds: Yup.array()
      .of(Yup.string().uuid("Raza inválida").required())
      .default([]),

    removeIds: Yup.array()
      .of(Yup.string().uuid("Raza inválida").required())
      .default([]),
  }).required(),

  traits: Yup.object({
    addIds: Yup.array()
      .of(Yup.string().uuid("Característica inválida").required())
      .default([]),

    removeIds: Yup.array()
      .of(Yup.string().uuid("Característica inválida").required())
      .default([]),
  }).required(),
});

export type PetUpdateDto = Yup.InferType<
  typeof petUpdateSchema
>;