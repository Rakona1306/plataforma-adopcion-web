"use client";

import { useDisclosure } from "@mantine/hooks";
import { Burger, Drawer } from "@mantine/core";
import { SidebarLayout, SidebarContent } from "./_components/layouts/sidebar";
import { manrope } from "@/lib/fonts/manrope";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={`${manrope.className} flex h-screen`}>
      {/* Sidebar Fija Desktop */}
      <SidebarLayout />

      {/* Drawer Móvil (Solo renderiza el contenido) */}
      <Drawer opened={opened} onClose={close} size="xs" withCloseButton={false} padding={0}>
        <SidebarContent onClose={close} />
      </Drawer>

      {/* Main Content */}
      <main className="flex-1 h-screen bg-gray-100 overflow-y-auto">
        {children}
      </main>

      {/* Botón Flotante (Solo visible en móvil) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <div className="bg-white p-3 rounded-full shadow-xl border border-gray-200">
          <Burger opened={opened} onClick={open} size="md" />
        </div>
      </div>
    </div>
  );
}