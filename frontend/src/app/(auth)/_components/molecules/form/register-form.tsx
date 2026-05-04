'use client'

import { motion } from 'motion/react'
import * as Yup from 'yup'
import { useState } from 'react'
import FormContainer, { FormContainerFormikSubmit } from '@/presentation/molecules/form-container'
import SocialLinks from '../social-links'
import Input from '@/presentation/atoms/input'

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener mínimo 3 caracteres')
    .required('El nombre es requerido'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
  acceptTerms: Yup.boolean().oneOf([true], 'Debes aceptar los términos'),
})

type RegisterFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit: FormContainerFormikSubmit<RegisterFormValues> = async (values) => {
    setIsLoading(true)
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Register:', values)
      // Aquí iría la lógica real de registro
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-primary mb-2">Crea tu cuenta 🐕</h2>
        <p className="text-slate-500">Únete a nuestra comunidad de amantes de mascotas</p>
      </motion.div>

      <FormContainer<RegisterFormValues>
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false,
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
        </motion.div>

        <motion.div variants={itemVariants} className='flex gap-5'>
          <Input
            name="name"
            label="Nombre Completo"
            type="text"
            placeholder="Juan Pérez"
            leftIcon={<span>👤</span>}
          />
          <Input
            name="email"
            label="Correo Electrónico"
            type="email"
            placeholder="tu@email.com"
            leftIcon={<span>📧</span>}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            leftIcon={<span>🔒</span>}
            rightIcon={
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm font-semibold text-primary hover:text-secondary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? '🙈' : '👁️'}
              </motion.button>
            }
            rightIconOnClick={() => setShowPassword(!showPassword)}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            name="confirmPassword"
            label="Confirmar Contraseña"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            leftIcon={<span>✓</span>}
            rightIcon={
              <motion.button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-sm font-semibold text-primary hover:text-secondary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </motion.button>
            }
            rightIconOnClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-start gap-2">
          <motion.input
            type="checkbox"
            name="acceptTerms"
            className="w-4 h-5 accent-primary rounded cursor-pointer mt-1 flex-shrink-0"
            whileHover={{ scale: 1.1 }}
          />
          <label className="text-sm text-slate-600 cursor-pointer">
            Acepto los{' '}
            <motion.a
              href="#"
              className="text-primary hover:text-secondary font-semibold"
              whileHover={{ underlinePosition: 'under' }}
            >
              términos y condiciones
            </motion.a>
            {' '}y la{' '}
            <motion.a
              href="#"
              className="text-primary hover:text-secondary font-semibold"
              whileHover={{ underlinePosition: 'under' }}
            >
              política de privacidad
            </motion.a>
          </label>
        </motion.div>

        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-70 hover:shadow-lg"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🐾
              </motion.span>
              Creando cuenta...
            </span>
          ) : (
            'Crear Cuenta'
          )}
        </motion.button>
      </FormContainer>

      <motion.div variants={itemVariants} className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">O regístrate con</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SocialLinks />
      </motion.div>
    </motion.div>
  )
}
