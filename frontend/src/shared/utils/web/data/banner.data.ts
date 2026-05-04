export interface BannerHomeItem {
  src: string
  alt: string
  title: string
  subtitle: string
  description: string
  cta: string
  ctaLink: string
  category: 'adopcion' | 'donacion' | 'voluntariado' | 'seguimiento'
}

export interface BannerHomeData {
  items: BannerHomeItem[]
}

export const bannerData: BannerHomeData = {
  items: [
    {
      src: '/home/banners/banner-1.jpg',
      alt: 'Adopta tu mascota perfecta',
      title: 'Encuentra tu Compañero Perfecto',
      subtitle: 'Miles de mascotas esperan tu amor',
      description: 'Cada adopción es un acto de amor. Nuestras mascotas necesitan un hogar donde puedan ser felices. Haz una diferencia hoy y cambia una vida.',
      cta: 'Ver Mascotas',
      ctaLink: '/mascotas',
      category: 'adopcion'
    },
    {
      src: '/home/banners/banner-2.jpg',
      alt: 'Sé padrino de una mascota',
      title: 'Apadrina y Haz la Diferencia',
      subtitle: 'Apoya a nuestras mascotas sin compromisos de adopción',
      description: 'Con tu aporte mensual, proporcionas alimento, cuidados médicos y amor. Recibe fotos y actualizaciones mensuales de tu mascota.',
      cta: 'Conviértete en Padrino',
      ctaLink: '/mascotas',
      category: 'donacion'
    },
    {
      src: '/home/banners/banner-3.jpg',
      alt: 'Únete como voluntario',
      title: 'Voluntariado: Haz Voluntad',
      subtitle: 'Dedica tu tiempo a lo que realmente importa',
      description: 'Necesitamos manos amigas para cuidar, pasear y socializar a nuestras mascotas. Si amas a los animales, ¡te necesitamos!',
      cta: 'Sé Voluntario',
      ctaLink: '/voluntariado',
      category: 'voluntariado'
    },
    {
      src: '/home/banners/banner-4.jpg',
      alt: 'Seguimiento post-adopción',
      title: 'Estamos Contigo Después de la Adopción',
      subtitle: 'Tu mascota merece lo mejor siempre',
      description: 'Nuestro equipo de expertos está disponible 24/7 para asesorarte sobre cuidados, salud y comportamiento de tu nueva familia.',
      cta: 'Nosotros',
      ctaLink: '/nosotros',
      category: 'seguimiento'
    },
    {
      src: '/home/banners/banner-5.jpg',
      alt: 'Historias de éxito',
      title: 'Historias que Inspiran',
      subtitle: 'Conoce las transformaciones que hemos logrado juntos',
      description: 'Cientos de familias han encontrado la felicidad adoptando con nosotros. Lee sus historias y déjate inspirar para dar el siguiente paso.',
      cta: 'Realizar donación',
      ctaLink: '/donaciones',
      category: 'adopcion'
    }
  ]
}
