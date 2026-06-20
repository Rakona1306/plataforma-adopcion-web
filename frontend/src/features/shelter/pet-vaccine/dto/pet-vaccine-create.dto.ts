import * as Yup from 'yup';
import { petVaccineSchema } from '../schemas/pet-vaccine.schema';

export type PetVaccineCreateDto = Yup.InferType<typeof petVaccineSchema>;