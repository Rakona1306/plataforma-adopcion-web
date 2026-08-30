import { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/adoptasalvavidas.pe?locale=es_LA",
    icon: FaFacebook,
  },
  {
    name: "Whatsapp",
    href: "https://api.whatsapp.com/send?phone=51955288116",
    icon: FaWhatsapp,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/Albergue.adoptasalvavidas",
    icon: FaInstagram,
  },
  {
    name: "Tiktok",
    href: "https://www.tiktok.com/@adopta.salvavidas",
    icon: FaTiktok,
  },
];

export interface SocialLink {
  name: string;
  href: string;
  icon: IconType;
}
