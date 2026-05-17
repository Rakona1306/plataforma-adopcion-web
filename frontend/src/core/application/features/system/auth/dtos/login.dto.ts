import * as Yup from 'yup';

export const LoginDto = Yup.object().shape({
  email: Yup.string().email('El email es invalido').required('El email es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

export type LoginDto = Yup.InferType<typeof LoginDto>;