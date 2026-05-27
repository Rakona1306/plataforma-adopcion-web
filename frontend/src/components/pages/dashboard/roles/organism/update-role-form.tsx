import Input from "@/components/atoms/input";
import Textarea from "@/components/atoms/text-area";
import BooleanSelect from "@/components/molecules/boolean-select";
import FormContainer from "@/components/molecules/form-container";
import {
  RoleUpdateDto,
  RoleUpdateSchema,
} from "@/core/application/features/organization/roles/dtos/role-update-dto";
import { Role } from "@/core/domain/models/organization/role";
import { PermissionConditional } from "../molecules/permission-conditional";
import { Button } from "@mantine/core";

interface UpdateRoleFormProps {
  role: Role;
}

export function UpdateRoleForm({ role }: UpdateRoleFormProps) {
  const initialPermissionIds = role.permissions.map((p) => p.id);

  const initialValues: RoleUpdateDto = {
    name: role.name,
    description: role.description ?? "",
    notDelete: role.notDelete,
    toDashboard: role.toDashboard,

    currentPermissions: initialPermissionIds,
  };

  const handleSubmit = (values: RoleUpdateDto) => {
    const current = values.currentPermissions || [];

    const permissionsToAdd = current.filter(
      (id: string) => !initialPermissionIds.includes(id),
    );

    const permissionsToRemove = initialPermissionIds.filter(
      (id: string) => !current.includes(id),
    );

    const payload = {
      ...values,
      permissionsToAdd,
      permissionsToRemove,
    };

    console.log("Payload para backend:", payload);
  };

  return (
    <FormContainer
      initialValues={initialValues}
      validationSchema={RoleUpdateSchema}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <section>
        <Input name="name" label="Nombre del rol:" />
      </section>

      <section className="w-full">
        <BooleanSelect
          name="toDashboard"
          label="¿Permitir acceso al dashboard?"
        />
      </section>

      <PermissionConditional initialPermissions={initialPermissionIds} />

      <section className="w-full">
        <Textarea name="description" label="Descripción del rol:" />
      </section>

      <Button type="submit" className="w-full! bg-primary h-10!">
        Crear
      </Button>
    </FormContainer>
  );
}
