'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import FormContainer, { FormContainerFormikSubmit } from '@/components/molecules/form-container'
import Input from '@/components/atoms/input'
import { RegisterDto } from '@/core/application/features/system/auth/dtos/register.dto'
import { getFieldError } from '@/core/shared/helpers/getFieldError'
import { containerVariants, itemVariants } from '@/core/shared/helpers/variants'
import { useRegister } from '@/features/system/auth/hooks/useRegister'
import { useConfirmOptStore } from '@/store/use-confirm-opt-store'
import { AuthConfirmEmailDto, authConfirmEmailSchema } from '@/features/system/auth/dto/auth-confirm-email.dto'
import useConfirmOptUser from '@/features/system/auth/hooks/modal/use-confirm-opt-user'
import { montserrat } from '@/lib/fonts/monserrat'
import { Flex, PinInput } from "@mantine/core";
import ButtonUI from '@/components/atoms/button/button-ui'
import { useTokenStore } from '@/core/application/hooks/session/useToken'
import { Alert } from '@/components/atoms/alert'
import useCompleteRegistration from '@/features/system/auth/hooks/modal/use-complete-registration'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/features/system/auth/hooks/useProfile'

export default function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { register, isLoading, error, isError } = useRegister()
  const { setConfirmOpt, setUserRegistered, confirmOpt, userRegistered } = useConfirmOptStore()
  const { confirmOpt: confirmOptSubmit, isLoading: isConfirmLoading, error: confirmOptError } = useConfirmOptUser()
  const { completeRegistration } = useCompleteRegistration()
  const { setToken } = useTokenStore()
  const { refetchProfile } = useProfile()

  const handleSubmit: FormContainerFormikSubmit<RegisterDto> = async (values) => {
    register(values, {
      onSuccess: (_, variables) => {
        setConfirmOpt(true)
        setUserRegistered(variables)
      }
    })
  }

  const initialValues: AuthConfirmEmailDto = {
    email: userRegistered?.email || '',
    code: ''
  }

  const handleConfirmOpt = (values: AuthConfirmEmailDto) => {
    confirmOptSubmit({ code: values.code, email: values.email }, {
      onSuccess: () => {
        completeRegistration({
          code: values.code,
          email: values.email,
          name: userRegistered?.name || '',
          lastName: userRegistered?.lastName || '',
          password: userRegistered?.password || ''
        }, {
          onSuccess: async (data) => {
            await setToken(data.token)
            setConfirmOpt(false)
            setUserRegistered(null)

            refetchProfile()

            Swal.fire({
              icon: 'success',
              title: 'Registro completado',
              text: 'Tu cuenta ha sido creada exitosamente.',
              confirmButtonText: 'Aceptar'
            })
            router.back()
          }
        })
      }
    })
  }

  const backToRegister = () => {
    setConfirmOpt(false)
    setUserRegistered(null)
  }

  if (confirmOpt) {
    return (
      <FormContainer<AuthConfirmEmailDto>
        initialValues={initialValues}
        validationSchema={authConfirmEmailSchema}
        onSubmit={handleConfirmOpt}
        className="space-y-10"
      >
        {({ setFieldValue, values, errors }) => (
          <>
            <div>
              <h2 className={`text-xl font-bold! text-primary mb-2 ${montserrat.className}`}>Confirmar Código OTP</h2>
              <p className={`text-slate-800 font-medium ${montserrat.className} text-base`}>Se ha enviado un código OTP a tu correo electrónico: <span className="font-bold">{userRegistered?.email}</span></p>
            </div>

            {
              confirmOptError && (
                <Alert
                  type='error'
                  message={confirmOptError.message || "Ocurrió un error al confirmar el código OTP. Por favor, inténtalo de nuevo."}
                />
              )
            }

            <div className="flex flex-col gap-2 items-center">
              <label htmlFor="code" className={`text-base ${montserrat.className} font-bold`}>Codigo</label>
              <PinInput
                name='code'
                inputMode="numeric"
                value={values.code}
                id="code"
                size="lg"
                length={6}
                classNames={{
                  pinInput: 'outline-primary!',
                  input: 'border-primary! border-4!'
                }}
                autoFocus
                onChange={(value) => setFieldValue('code', value)}
              />
              {errors.code && <div className="text-red-500">{errors.code}</div>}
              {errors.email && <div className="text-red-500">{errors.email}</div>}
            </div>

            <Flex gap={'xs'}>
              <ButtonUI onClick={backToRegister} type="button" loading={isConfirmLoading} rootClassName="bg-slate-700! hover:bg-slate-800!" fullWidth>
                Volver
              </ButtonUI>
              <ButtonUI type="submit" loading={isConfirmLoading} fullWidth>
                Confirmar Código
              </ButtonUI>
            </Flex>
          </>
        )}
      </FormContainer>
    )
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

      <FormContainer<RegisterDto>
        initialValues={{
          name: '',
          email: '',
          password: '',
          lastName: ''
        }}
        validationSchema={RegisterDto}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {
          isError && (
            <Alert
              message={error?.message || "Ocurrió un error al crear la cuenta. Por favor, inténtalo de nuevo."}
              type='error'
            />
          )
        }

        <motion.div variants={itemVariants} className='flex gap-5'>
          <Input
            name="name"
            label="Nombres"
            type="text"
            placeholder="Juan"
            error={getFieldError(error, 'Name')}
          />
          <Input
            name="lastName"
            label="Apellidos"
            type="text"
            placeholder="Perez"
            error={getFieldError(error, 'LastName')}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            name="email"
            label="Correo Electrónico"
            type="email"
            placeholder="tu@email.com"
            error={getFieldError(error, 'Email')}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            error={getFieldError(error, 'Password')}
            placeholder="••••••••"
            rightIcon={
              <motion.div
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm font-semibold text-primary hover:text-secondary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? '🙈' : '👁️'}
              </motion.div>
            }
            rightIconOnClick={() => setShowPassword(!showPassword)}
          />
        </motion.div>



        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-linear-to-r from-primary to-secondary text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-70 hover:shadow-lg"
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

    </motion.div>
  )
}
