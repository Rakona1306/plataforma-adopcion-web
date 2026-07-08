import { ReactNode } from "react";
import {
  HiOutlineLogout,
  HiOutlinePencil,
  HiOutlineUser,
} from "react-icons/hi";
import { MdMonitor, MdRequestQuote } from "react-icons/md";

interface MenuItem {
  label: string;
  icon: ReactNode;
  action?: () => void;
  color: string;
  divider?: boolean;
  href?: string;
  auth?: boolean;
}

export function getMenuItems({ onLogout, onEdit }: {
  onLogout: () => void;
  onEdit: () => void
}) {

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <MdMonitor className="w-4 h-4" />,
      color: "text-slate-700",
      href: "/dashboard",
      auth: true
    },
    {
      label: "Mi información",
      icon: <HiOutlineUser className="w-4 h-4" />,
      href: "/account/profile",
      color: "text-slate-700",
    },
    {
      label: "Editar perfil",
      icon: <HiOutlinePencil className="w-4 h-4" />,
      action: onEdit,
      color: "text-slate-700",
    },
    {
      label: "Mis solicitudes",
      icon: <MdRequestQuote className="w-4 h-4" />,
      href: "/account/solicitudes",
      color: "text-slate-700",
    },
    {
      label: "Cerrar sesión",
      icon: <HiOutlineLogout className="w-4 h-4" />,
      action: onLogout,
      color: "text-rose-500",
      divider: true,
    }
  ];

  return menuItems;
}
