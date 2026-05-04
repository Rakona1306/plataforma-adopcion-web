'use client'

import { motion } from 'motion/react'
import * as Yup from 'yup'
import { useState } from 'react'
import FormContainer, { FormContainerFormikSubmit } from '@/presentation/molecules/form-container'
import Input from '@/presentation/atoms/input'
import SocialLinks from '../social-links'
import { companyInfo } from '@/app/(web)/_utils/data/companyInfo.data'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres')
    .required('La contraseña es requerida'),
})

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit: FormContainerFormikSubmit<LoginFormValues> = async (values) => {
    setIsLoading(true)
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Login:', values)
      // Aquí iría la lógica real de login
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-primary mb-2">Bienvenido 👋</h2>
        <p className="text-slate-500">Inicia sesión en tu cuenta de {companyInfo.name}</p>
      </motion.div>

      <FormContainer<LoginFormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <motion.div variants={itemVariants}>
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

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <label className="flex items-center gap-2 cursor-pointer group">
            <motion.input
              type="checkbox"
              className="w-4 h-4 accent-primary rounded cursor-pointer"
              whileHover={{ scale: 1.1 }}
            />
            <span className="text-sm text-slate-600 group-hover:text-primary transition">
              Recuérdame
            </span>
          </label>
          <motion.a
            href="#"
            className="text-sm text-primary hover:text-secondary font-semibold transition"
            whileHover={{ x: 2 }}
          >
            ¿Olvidaste tu contraseña?
          </motion.a>
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
              Ingresando...
            </span>
          ) : (
            'Iniciar Sesión'
          )}
        </motion.button>
      </FormContainer>

      <motion.div variants={itemVariants} className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">O continúa con</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SocialLinks />
      </motion.div>
    </motion.div>
  )
}
