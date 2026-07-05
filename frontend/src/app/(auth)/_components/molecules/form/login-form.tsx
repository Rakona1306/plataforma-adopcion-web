"use client";

import { motion } from "motion/react";
import { useState } from "react";
import SocialLinks from "../social-links";
import { companyInfo } from "@/app/(web)/_utils/data/companyInfo.data";
import FormContainer, {
  FormContainerFormikSubmit,
} from "@/components/molecules/form-container";
import Input from "@/components/atoms/input";
import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
// import { useAuth } from "@/core/application/features/system/auth/hooks/useAuth";

import { getFieldError } from "@/core/shared/helpers/getFieldError";
import {
  containerVariants,
  itemVariants,
} from "@/core/shared/helpers/variants";
import { Alert } from "@/components/atoms/alert";
import { useLogin } from "@/features/system/auth/hooks/use-login";
import Swal from "sweetalert2";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useTokenStore } from "@/core/application/hooks/session/useToken";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useTokenStore();
  const { setUser } = useSessionStore();
  const router = useRouter()
  const queryClient = useQueryClient()

  const { login, isLoading, error } = useLogin({
    onSuccess: (data) => {
      console.log('SUCCESS LOGIN')

      setToken(data.token);
      setUser(data.user);

      Swal.fire({
        icon: "success",
        title: `Bienvenido ${data.user.name} ${data.user.lastName}`,
        timer: 3000,
        width: 600
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SYSTEM.AUTH]
      })

      if (data.user.toDashboard) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  });

  const handleSubmit: FormContainerFormikSubmit<LoginDto> = async (values) => {
    login(values);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-primary mb-2">Bienvenido 👋</h2>
        <p className="text-slate-500">
          Inicia sesión en tu cuenta de {companyInfo.name}
        </p>
      </motion.div>

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
  );
}
