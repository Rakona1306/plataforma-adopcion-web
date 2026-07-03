"use client"


import useGetPermissionsByRoleId from "@/features/organization/role-permission/hooks/useGetPermissionsByRoleId";
import { NavLink, navLinks } from "../../utils/nav-links.data";
import NavLinksItem from "./nav-links-item";
import { useEffect, useState } from "react";
import { filterNavLinksByPermissions } from "@/helpers/dashboard/filterNavLinkByPermissions";

interface Props {
  onClose?: () => void
  roleId: string
}

export default function NavLinks({ onClose, roleId }: Props) {

  const { rolePermissions, isLoading } = useGetPermissionsByRoleId(roleId)
  const [filteredLinks, setFilteredLinks] = useState<NavLink[]>([])

  useEffect(() => {
    if (isLoading) return

    const filteredLinks = filterNavLinksByPermissions(
      navLinks,
      rolePermissions
    );
    setFilteredLinks(filteredLinks)
  }, [isLoading])

  return (
    <div className="w-full space-y-1 py-4">
      {filteredLinks?.map((link) => (
        <NavLinksItem key={link.module} {...link} onClose={onClose} />
      ))}
    </div>
  );
}