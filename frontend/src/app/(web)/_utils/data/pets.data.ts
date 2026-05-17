import { Pet } from "@/core/domain/models/Pet";


export const petsData: Pet[] = [
  {
    id: 1,
    name: "Max",
    description: "Max es un cachorro golden retriever muy cariñoso y juguetón. Adora a los niños y es perfecto para familias. Tiene 2 años y está completamente vacunado y castrado.",
    age: 2,
    images: [
      { id: 1, url: "/images-pet/pet-1.jpg" },
      { id: 2, url: "/images-pet/pet-1.jpg" },
    ],
    characteristics: [
      { id: "friendly", name: "Amigable" },
      { id: "active", name: "Activo" },
      { id: "smart", name: "Inteligente" },
    ],
    race: {
      id: 1,
      name: "Perro",
      description: "Un animal doméstico leal y cariñoso",
    },
    breed: "Golden Retriever",
    gender: "Macho",
    isVaccinated: true,
    history: "Max fue rescatado de una familia que no podía cuidarlo por falta de tiempo. Desde entonces ha estado en un hogar temporal donde ha demostrado ser muy sociable y amoroso con niños y otros animales.",
    
  },
  {
    id: 2,
    name: "Luna",
    description: "Luna es una border collie muy inteligente y ágil. Ideal para personas activas que disfrutan pasar tiempo al aire libre. Tiene 3 años y necesita mucho ejercicio.",
    age: 3,
    images: [
      { id: 1, url: "/images-pet/pet-2.jpg" },
      { id: 2, url: "/images-pet/pet-2.jpg" },
    ],
    characteristics: [
      { id: "intelligent", name: "Inteligente" },
      { id: "energetic", name: "Energético" },
      { id: "alert", name: "Alerta" },
    ],
    race: {
      id: 1,
      name: "Perro",
      description: "Un animal doméstico leal y cariñoso",
    },
    breed: "Border Collie",
    gender: "Hembra",
    isVaccinated: true,
    history: "Luna fue encontrada en la calle en condiciones de abandono. Gracias a su inteligencia, aprendió rápidamente normas básicas en el refugio y ahora busca una familia que pueda darle actividad y cariño constante."
  },
  {
    id: 3,
    name: "Misu",
    description: "Misu es una gata tabby muy cariñosa y tranquila. Perfecta para departamentos y personas que buscan una compañía tranquila. Tiene 1 año y es muy sociable.",
    age: 1,
    images: [
      { id: 1, url: "/images-pet/pet-3.jpg" },
      { id: 2, url: "/images-pet/pet-3.jpg" },
    ],
    characteristics: [
      { id: "calm", name: "Tranquilo" },
      { id: "affectionate", name: "Cariñoso" },
      { id: "playful", name: "Juguetón" },
    ],
    race: {
      id: 2,
      name: "Gato",
      description: "Un felino independiente y gracioso",
    },
    breed: "Gato Tabby",
    gender: "Hembra",
    isVaccinated: true,
    history: "Misu nació en la calle junto a sus hermanos y fue rescatada siendo muy pequeña. Ha crecido en un entorno seguro, por lo que es confiada con las personas y disfruta mucho la compañía."
  },
  {
    id: 4,
    name: "Rocky",
    description: "Rocky es un pastor alemán valiente y protector. Excelente como perro de familia y guardián. Tiene 4 años, bien adiestrado y completamente vacunado.",
    age: 4,
    images: [
      { id: 1, url: "/images-pet/pet-4.jpg" },
      { id: 2, url: "/images-pet/pet-4.jpg" },
    ],
    characteristics: [
      { id: "protective", name: "Protector" },
      { id: "loyal", name: "Leal" },
      { id: "obedient", name: "Obediente" },
    ],
    race: {
      id: 1,
      name: "Perro",
      description: "Un animal doméstico leal y cariñoso",
    },
    breed: "Pastor Alemán",
    gender: "Macho",
    isVaccinated: true,
    history: "Rocky pertenecía a un hogar donde fue entrenado como perro guardián, pero fue entregado al refugio tras una mudanza. Es disciplinado y busca una familia que valore su lealtad."
  },
  {
    id: 5,
    name: "Blanca",
    description: "Blanca es una gata persa hermosa con un pelaje blanco sedoso. Requiere cuidado regular del pelaje pero es extremadamente cariñosa. Tiene 2 años y adora las caricias.",
    age: 2,
    images: [
      { id: 1, url: "/images-pet/pet-5.jpg" },
      { id: 2, url: "/images-pet/pet-5.jpg" },
    ],
    characteristics: [
      { id: "gentle", name: "Gentil" },
      { id: "affectionate", name: "Cariñoso" },
      { id: "calm", name: "Tranquilo" },
    ],
    race: {
      id: 2,
      name: "Gato",
      description: "Un felino independiente y gracioso",
    },
    breed: "Persa",
    gender: "Hembra",
    isVaccinated: true,
    history: "Blanca fue abandonada por sus dueños anteriores debido al mantenimiento de su pelaje. A pesar de eso, mantiene un carácter dulce y disfruta estar en ambientes tranquilos."
  },
  {
    id: 6,
    name: "Bruno",
    description: "Bruno es un labrador retriever marrón muy cariñoso e inteligente. Excelente como perro de servicio o compañía familiar. Tiene 3 años y ama el agua.",
    age: 3,
    images: [
      { id: 1, url: "/images-pet/pet-6.jpg" },
      { id: 2, url: "/images-pet/pet-6.jpg" },
    ],
    characteristics: [
      { id: "friendly", name: "Amigable" },
      { id: "smart", name: "Inteligente" },
      { id: "obedient", name: "Obediente" },
    ],
    race: {
      id: 1,
      name: "Perro",
      description: "Un animal doméstico leal y cariñoso",
    },
    breed: "Labrador Retriever",
    gender: "Macho",
    isVaccinated: true,
    history: "Bruno fue criado en un hogar donde recibía mucho amor, pero fue entregado por motivos personales. Está bien socializado, sabe obedecer órdenes básicas y se adapta fácilmente a nuevos entornos."
  },
]
