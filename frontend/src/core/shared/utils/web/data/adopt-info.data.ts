import { IconType } from "react-icons"
import { AiOutlineHome } from "react-icons/ai"
import { CgFileDocument } from "react-icons/cg"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { LuUsers } from "react-icons/lu"

export const adoptInfoData: AdoptInfoItem[] = [
  {
    phaseText: "Paso 01",
    Icon: CgFileDocument,
    title: "Solicitud",
    description: "Completa nuestro formulario de adopción con información sobre tu hogar y estilo de vida."
  },
  {
    phaseText: "Paso 02",
    Icon: LuUsers,
    title: "Entrevista",
    description: "Nuestro equipo se comunica contigo para conocerte mejor y asegurar la mejor compatibilidad."
  },
  {
    phaseText: "Paso 03",
    Icon: AiOutlineHome,
    title: "Conoce a tu Mascota",
    description: "Visita nuestro refugio y conoce personalmente a tu posible nuevo compañero."
  },
  {
    phaseText: "Paso 04",
    Icon: IoIosCheckmarkCircleOutline,
    title: "Adopción Final",
    description: "Firma los documentos y lleva a tu nueva mascota a casa. ¡Bienvenido a la familia!"
  }
]

export interface AdoptInfoItem {
  phaseText: string
  Icon: IconType
  title: string
  description: string
}