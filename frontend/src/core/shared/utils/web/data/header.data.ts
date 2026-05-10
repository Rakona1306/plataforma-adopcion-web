
interface HeaderData {
  logo: string
  navLinks: { name: string, href: string }[]
}

export const headerData: HeaderData = {
  logo: "/logo.png",
  navLinks: [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Mascotas", href: "/mascotas" },
    { name: 'Voluntariado', href: '/voluntariado' },
    { name: "Donaciones", href: "/donaciones" },
  ]
}