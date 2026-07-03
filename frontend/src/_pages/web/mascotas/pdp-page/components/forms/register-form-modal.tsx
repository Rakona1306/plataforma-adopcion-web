import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { RegisterDto } from "@/core/application/features/system/auth/dtos/register.dto";
import { getFieldError } from "@/core/shared/helpers/getFieldError";
import { itemVariants } from "@/core/shared/helpers/variants";
import useRegisterModal from "@/features/system/auth/hooks/modal/use-register-modal";
import { motion } from "motion/react";
import { useState } from "react";

export default function RegisterFormModal() {

    const { error, isLoading, register } = useRegisterModal()
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (values: RegisterDto) => {
        register(values);
    }

    return (
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
                        Validando cuenta...
                    </span>
                ) : (
                    'Crear Cuenta'
                )}
            </motion.button>
        </FormContainer>
    )
}