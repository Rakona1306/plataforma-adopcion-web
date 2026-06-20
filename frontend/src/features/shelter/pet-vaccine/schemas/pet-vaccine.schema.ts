import * as Yup from 'yup';

export const petVaccineSchema = Yup.object({
    petId: Yup.string().uuid('Debe ser una id tipo uuid').required('Requerido'),
    vaccineId: Yup.string().uuid('Debe ser una id tipo uuid').required('Requerido'),
    appliedDate: Yup.date().required('Requerido'),
    expirationDate: Yup.date().optional()
});