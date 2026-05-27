import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import Textarea from "@/components/atoms/text-area";
import BooleanSelect from "@/components/molecules/boolean-select";
import FormContainer from "@/components/molecules/form-container";
import {
  RoleCreateDto,
  RoleCreateSchema,
} from "@/core/application/features/organization/roles/dtos/role-create-dto";
import { useCreateRole } from "@/core/application/features/organization/roles/hooks/useCreateRol";
import { Button } from "@mantine/core";
import { PermissionConditional } from "../molecules/permission-conditional";

export default function CreateRoleForm() {
  const { create, isPending, isError, errorMessage, errorValidation } =
    useCreateRole();
  const initalValues: RoleCreateDto = {
    name: "",
    description: "",
    notDelete: false,
    toDashboard: true,
    permissionIds: [],
  };

  const handleSubmit = (values: RoleCreateDto) => {
    values.name = String(values.name).toUpperCase();
    create(values);
  };

  return (
    <FormContainer<RoleCreateDto>
      initialValues={initalValues}
      onSubmit={handleSubmit}
      validationSchema={RoleCreateSchema}
      className="space-y-5"
    >
      {isError && (
        <Alert icon message={errorMessage} type="error" className="w-full" />
      )}

      <section>
        <Input
          name="name"
          label="Nombre del rol:"
          error={errorValidation.name}
        />
      </section>

      <section className="w-full">
        <BooleanSelect
          name="toDashboard"
          label="¿Permitir acceso al dashboard?"
          errorMessage={errorValidation.toDashboard}
        />
      </section>

      <PermissionConditional initialPermissions={[]} />

      <section className="w-full">
        <Textarea
          name="description"
          label="Descripción del rol:"
          errorMessage={errorValidation.description}
        />
      </section>

      <Button
        type="submit"
        className="w-full! bg-primary h-10!"
        disabled={isPending}
      >
        Crear
      </Button>
    </FormContainer>
  );
}
