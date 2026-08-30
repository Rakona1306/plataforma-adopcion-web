"use client";

import useGetPermissionsByRoleId from "@/features/organization/role-permission/hooks/useGetPermissionsByRoleId";
import { navLinks } from "../../utils/nav-links.data";
import NavLinksItem from "./nav-links-item";
import { filterNavLinksByPermissions } from "@/helpers/dashboard/filterNavLinkByPermissions";

interface Props {
  onClose?: () => void;
  roleId: string;
}

export default function NavLinks({ onClose, roleId }: Props) {
  const { rolePermissions, isLoading } = useGetPermissionsByRoleId(roleId);

  // Derivar los enlaces filtrados directamente en el renderizado
  const filteredLinks = isLoading
    ? []
    : filterNavLinksByPermissions(navLinks, rolePermissions);

  return (
    <div className="w-full space-y-1 py-4">
      {filteredLinks.map((link) => (
        <NavLinksItem key={link.module} {...link} onClose={onClose} />
      ))}
    </div>
  );
}
