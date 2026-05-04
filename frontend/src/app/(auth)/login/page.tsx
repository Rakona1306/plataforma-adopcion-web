'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'motion/react'
import PetAnimation from '../_components/molecules/pet-animation'
import LoginForm from '../_components/molecules/form/login-form'
import RegisterForm from '../_components/molecules/form/register-form'
import { companyInfo } from '@/app/(web)/_utils/data/companyInfo.data'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-quaternary/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative pet paws background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <PetAnimation />
      </div>

      <motion.div
        className="w-full container mx-auto z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <motion.div variants={itemVariants} className="hidden md:flex flex-col gap-6">
            <div className="text-center md:text-left">
              <motion.h1
                className="text-5xl font-bold text-primary mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                🐾 {companyInfo.name}
              </motion.h1>
              <motion.p
                className="text-xl text-secondary font-semibold"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Albergue de Mascotas
              </motion.p>
            </div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex gap-3 items-center">
                <span className="text-2xl">🐕</span>
                <p className="text-foreground">Encuentra tu mascota perfecta</p>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-2xl">🐈</span>
                <p className="text-foreground">Conecta con gatos adorables</p>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-2xl">🦜</span>
                <p className="text-foreground">Adopta con confianza</p>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 p-4 bg-white/50 rounded-2xl border-2 border-terciary/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-sm text-foreground text-center">
                ✨ Únete a nuestra comunidad y ayuda a encontrar hogares amorosos para nuestras mascotas
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Forms */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle form */}
            <motion.div
              className="mt-8 text-center border-t border-slate-200 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <p className="text-slate-600 mb-3">
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              </p>
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
