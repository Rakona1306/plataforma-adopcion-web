"use client";

import { Modal, Tabs, Button, TextInput, PasswordInput, Stack, Group, PinInput } from "@mantine/core";
import { useLogin } from "@/features/system/auth/hooks/useLogin";
import { useRegister } from "@/features/system/auth/hooks/useRegister";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormContainer from "@/components/molecules/form-container";
import { LoginDto } from "@/core/application/features/system/auth/dtos/login.dto";
import { Alert } from "@/components/atoms/alert";
import { itemVariants } from "@/core/shared/helpers/variants";
import { motion } from "motion/react";
import Input from "@/components/atoms/input";
import { getFieldError } from "@/core/shared/helpers/getFieldError";
import { montserrat } from "@/lib/fonts/monserrat";
import LoginFormModal from "./forms/login-form-modal";
import RegisterFormModal from "./forms/register-form-modal";
import { useConfirmOptStore } from "@/store/use-confirm-opt-store";
import ConfirmOptModal from "./forms/confirm-opt-modal";

export function AuthModal() {
    const [activeTab, setActiveTab] = useState<string | null>("login");
    const { confirmOpt } = useConfirmOptStore()

    return (
        <>
            {
                confirmOpt ? (
                    <ConfirmOptModal />
                ) : (
                    <Tabs value={activeTab} onChange={setActiveTab}>
                        <Tabs.List>
                            <Tabs.Tab value="login" py={'1rem'} classNames={{
                                tab: 'data-[active]:border-primary! border-b-4! transition-all duration-300 ease-in-out',
                                tabLabel: `${montserrat.className} font-extrabold`
                            }}>Iniciar Sesión</Tabs.Tab>
                            <Tabs.Tab value="register" py={'1rem'} classNames={{
                                tab: 'data-[active]:border-primary! border-b-4! transition-all duration-300 ease-in-out',
                                tabLabel: `${montserrat.className} font-extrabold`
                            }}>Registrarse</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="login" pt="md">
                            <LoginFormModal />
                        </Tabs.Panel>

                        <Tabs.Panel value="register" pt="md">
                            <RegisterFormModal />
                        </Tabs.Panel>
                    </Tabs>
                )

            }
        </>
    );
}
