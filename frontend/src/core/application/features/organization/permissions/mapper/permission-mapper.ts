import { Permission } from "@/core/domain/models/organization/permission";

interface SelectOption {
  label: string;
  value: string;
}

export const permissionMapper = (permissions: Permission[]): SelectOption[] => {
  return permissions.map((permission) => ({
    label: permission.name,
    value: permission.id,
  }));
};