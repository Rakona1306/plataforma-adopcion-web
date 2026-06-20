import * as Yup from 'yup';

export const userPublicSchema = Yup.object({
    name: Yup.string()
        .max(70, 'El nombre no debe pasar de 70 caracteres')
        .required('El nombre es requerido'),

    lastName: Yup.string()
        .max(70, 'El apellido no debe pasar de 70 caracteres')
        .required('El apellido es requerido'),

    // DNI: Opcional, pero si se escribe, debe tener exactamente 8 números
    dni: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .matches(/^[0-9]{8}$/, 'El DNI debe tener exactamente 8 dígitos numéricos'),

    // RUC: Opcional, pero si se escribe, debe tener exactamente 11 números
    ruc: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .matches(/^[0-9]{11}$/, 'El RUC debe tener exactamente 11 dígitos numéricos'),

    // Teléfono: Opcional, validación estándar para celulares (ej: 9 dígitos)
    phone: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .matches(/^[0-9]{9,15}$/, 'Ingrese un número de teléfono válido (solo números)'),

    // Distrito: Opcional
    district: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .max(100, 'El distrito no debe pasar de 100 caracteres'),

    document: Yup.string().optional()
});
