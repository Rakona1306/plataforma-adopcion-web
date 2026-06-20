import { InferType } from "yup";
import { petVaccineSchema } from "../schemas/pet-vaccine.schema";

export type PetVaccineUpdateDto = InferType<typeof petVaccineSchema>