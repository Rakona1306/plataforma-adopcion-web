import * as Yup from 'yup';

export const RegisterDto = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  email: Yup.string().email('El email es invalido').required('El email es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

export type RegisterDto = Yup.InferType<typeof RegisterDto>;