import { NavLink } from "@/app/dashboard/_components/layouts/sidebar/utils/nav-links.data";
import { RolePermission } from "@/features/organization/role-permission/model/role-permission.model";

export const filterNavLinksByPermissions = (
    navLinks: NavLink[],
    permissions?: RolePermission[]
): NavLink[] => {

    if (!permissions) return []

    const normalize = (text: string) =>
        text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    const allowedModules = new Set(
        permissions.map(p => normalize(p.permission.name))
    );

    return navLinks.filter(link =>
        normalize(link.module) === "dashboard" ||
        allowedModules.has(normalize(link.module))
    );
};