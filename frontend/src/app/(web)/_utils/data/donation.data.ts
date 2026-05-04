export const donationData = {
  heroTitle: "Tu Donación Salva Vidas",
  heroSubtitle: "Cada contribución nos ayuda a rescatar, cuidar y encontrar hogares para mascotas necesitadas. Juntos hacemos la diferencia.",
  
  impactStats: [
    {
      amount: "S/.15",
      title: "Alimento",
      description: "Proporciona alimento nutritivo para un perro durante una semana",
      icon: "🍖"
    },
    {
      amount: "S/.35",
      title: "Cuidado Médico",
      description: "Cubre una consulta veterinaria completa y examen de salud",
      icon: "🏥"
    },
    {
      amount: "S/.75",
      title: "Vacunación",
      description: "Proporciona todas las vacunas necesarias para una mascota",
      icon: "💉"
    },
    {
      amount: "S/.150",
      title: "Adopción Completa",
      description: "Cubre el cuidado, vacunas y esterilización para una adopción segura",
      icon: "🏡"
    }
  ],

  paymentMethods: [
    {
      id: "credit-card",
      name: "Tarjeta de Crédito",
      icon: "💳",
      description: "Visa, Mastercard, American Express"
    },
    {
      id: "bank-transfer",
      name: "Transferencia Bancaria",
      icon: "🏦",
      description: "Transferencia directa a nuestra cuenta"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "🔐",
      description: "Seguro y rápido con tu cuenta PayPal"
    }
  ],

  donationPlans: [
    {
      type: "Una Sola Vez",
      popular: false,
      amounts: [25, 50, 100, 250],
      customAmount: true
    },
    {
      type: "Mensual",
      popular: true,
      amounts: [10, 25, 50, 100],
      customAmount: true,
      badge: "Más Impactante"
    }
  ],

  whyDonate: [
    {
      title: "100% Transparencia",
      description: "Recibirás reportes mensuales sobre cómo se utilizan tus donaciones y el impacto generado.",
      icon: "👁️"
    },
    {
      title: "Impacto Medible",
      description: "Cada donación es rastreada y recibirás actualizaciones del progreso de las mascotas que ayudaste.",
      icon: "📊"
    },
    {
      title: "Deducible de Impuestos",
      description: "Somos una organización sin fines de lucro registrada. Tu donación puede ser deducible fiscalmente.",
      icon: "📄"
    },
    {
      title: "Comunidad Solidaria",
      description: "Únete a cientos de donantes que están transformando vidas de mascotas todos los días.",
      icon: "🤝"
    }
  ],

  testimonials: [
    {
      name: "María García",
      amount: "S/.50 mensuales",
      message: "He visto el increíble trabajo que hacen. Cada mes recibo actualizaciones de cómo mi donación está ayudando.",
      image: "👩"
    },
    {
      name: "Carlos López",
      amount: "Donante único",
      message: "Doné S/.200 y en una semana adoptaron a Max, la mascota que estaba esperando. ¡Increíble!",
      image: "👨"
    },
    {
      name: "Ana Martínez",
      amount: "S/.100 mensuales",
      message: "La transparencia de Albergue Salva Vidas es admirable. Sé exactamente dónde va mi dinero.",
      image: "👱‍♀️"
    }
  ]
};