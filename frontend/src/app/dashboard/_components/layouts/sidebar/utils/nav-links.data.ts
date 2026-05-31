
import { IconType } from "react-icons";
import { FaDog, FaHome, FaMoneyCheck, FaUserPlus, FaUsers, FaUserTie } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export interface NavLinkItem {
  name: string;
  href: string;
}

export interface NavLink {
  module: string;
  icon: IconType;
  href?: string;
  items?: NavLinkItem[];
  onClose?: () => void;
}
export const navLinks: NavLink[] = [
  {
    module: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard"
  },
  {
    module: 'Organización',
    icon: FaUsers,
    items: [
      {
        name: 'Usuarios',
        href: '/dashboard/usuarios'
      },
      {
        name: 'Roles',
        href: '/dashboard/roles'
      }
    ]
  },
  {
    module: 'Albergue',
    icon: FaHome,
    items: [
      {
        name: 'Mascotas',
        href: '/dashboard/shelters'
      },
      {
        name: 'Caracteristicas',
        href: '/dashboard/areas'
      }
    ]
  },
  {
    module: 'Adopciones',
    icon: FaDog,
    items: [
      {
        name: 'Solicitudes',
        href: '/dashboard/pets'
      },
      {
        name: 'Mascotas Adoptadas',
        href: '/dashboard/adoption-requests'
      }
    ]
  },
  {
    module: 'Padrinos',
    icon: FaUserTie,
    items: [
      {
        name: 'Padrinos',
        href: '/dashboard/sponsors'
      },
      {
        name: 'Solicitudes',
        href: '/dashboard/sponsorship-requests'
      },
      {
        name: 'Reportes',
        href: '/dashboard/sponsorship-areas'
      },
    ]
  },
  {
    module: 'Voluntarios',
    icon: FaUserPlus,
    items: [
      {
        name: 'Voluntarios',
        href: '/dashboard/volunteers'
      },
      {
        name: 'Solicitudes',
        href: '/dashboard/volunteer-requests'
      },
    ]
  },
  {
    module: 'Donaciones',
    icon: FaMoneyCheck,
    items: [
      {
        name: 'Donaciones',
        href: '/dashboard/donations'
      },
      {
        name: "Solicitudes",
        href: '/dashboard/donation-requests'
      },
      {
        name: 'Reportes',
        href: '/dashboard/donation-reports'
      }
    ]
  }
]