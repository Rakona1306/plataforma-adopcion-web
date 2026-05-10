export const sponsorshipData: SponsorshipItem[] = [
  {
    img: "/home/sponsorship/sponsorship_1.jpg",
    title: "Tu Dinero Cuenta",
    description: "El 100% de tu aportación va directamente a la alimentación, medicina y cuidado de tu mascota padrino."
  },
  {
    img: "/home/sponsorship/sponsorship_2.jpg",
    title: "Conexión Real",
    description: "Recibe actualizaciones genuinas sobre cómo tu padrino ha mejorado la vida de su mascota."
  },
  {
    img: "/home/sponsorship/sponsorship_3.jpg",
    title: "Impacto Duradero",
    description: "Sé parte de una comunidad que transforma vidas animales todos los días."
  }
]

export interface SponsorshipItem {
  img: string
  title: string
  description: string
}