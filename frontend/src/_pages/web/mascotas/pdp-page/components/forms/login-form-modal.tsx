'use client'
import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { getFieldError } from "@/core/shared/helpers/getFieldError";
import { motion } from "motion/react";
import { itemVariants } from "@/core/shared/helpers/variants";
import { useState } from "react";
import { useLogin } from "@/features/system/auth/hooks/use-login";
import { useTokenStore } from "@/core/application/hooks/session/useToken";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useModal } from "@/core/application/hooks/ui/useModal";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    Component: React.ReactNode;
    header: string
}

export default function LoginFormModal({ Component, header }: Props) {
    const { setToken } = useTokenStore();
    const queryClient = useQueryClient()
    const { handleOpenModal } = useModal() || {}

    const { error, isLoading, login } = useLogin({
        onSuccess: (data) => {
            setToken(data.token);

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SYSTEM.AUTH]
            })

            handleOpenModal && handleOpenModal({
                header: header,
                content: Component
            })
        }
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (values: LoginDto) => {
        login(values)
    }

    return (
        <FormContainer<LoginDto>
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={LoginDto}
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {error && (
                <Alert
                    type="error"
                    message="Error en el inicio de sesión"
                    title={error.message || "Ocurrió un error inesperado"}
                />
            )}

            <motion.div variants={itemVariants}>
                <Input
                    error={getFieldError(error, "Email")}
                    hasErrorActive={error ? true : false}
                    name="email"
                    label="Correo Electrónico"
                    type="email"
                    placeholder="tu@email.com"
                    leftIcon={<span>📧</span>}
                />
            </motion.div>

            <motion.div variants={itemVariants}>
                <Input
                    error={getFieldError(error, "Password")}
                    hasErrorActive={error ? true : false}
                    name="password"
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    leftIcon={<span>🔒</span>}
                    rightIcon={
                        <motion.div
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm font-semibold text-primary hover:text-secondary"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </motion.div>
                    }
                    rightIconOnClick={() => setShowPassword(!showPassword)}
                />
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="flex items-center justify-between"
            >
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
                        Ingresando...
                    </span>
                ) : (
                    "Iniciar Sesión"
                )}
            </motion.button>
        </FormContainer>
    )
}