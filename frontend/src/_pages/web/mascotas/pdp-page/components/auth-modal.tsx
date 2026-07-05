"use client";

import { Tabs } from "@mantine/core";
import { useState } from "react";
import { montserrat } from "@/lib/fonts/monserrat";
import LoginFormModal from "./forms/login-form-modal";
import RegisterFormModal from "./forms/register-form-modal";
import { useConfirmOptStore } from "@/store/use-confirm-opt-store";
import ConfirmOptModal from "./forms/confirm-opt-modal";

interface Props {
    Component: React.ReactNode;
    header: string
}

export function AuthModal({ Component, header }: Props) {
    const [activeTab, setActiveTab] = useState<string | null>("login");
    const { confirmOpt } = useConfirmOptStore()

    return (
        <>
            {
                confirmOpt ? (
                    <ConfirmOptModal Component={Component} header={header} />
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
                            <LoginFormModal Component={Component} header={header} />
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
