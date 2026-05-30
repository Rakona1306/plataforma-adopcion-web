// src/app/dashboard/usuarios/_components/update-user-form.tsx
"use client";

import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import BooleanSelect from "@/components/molecules/boolean-select";
import FormContainer from "@/components/molecules/form-container";
import { SearchSelect } from "@/components/organisms/search-select";
import SelectInput from "@/components/organisms/select-input";
import { useGetAllRoles } from "@/core/application/features/organization/roles/hooks/useGetAllRoles";
import {
  UserUpdateDto,
  UserUpdateSchema,
} from "@/core/application/features/organization/user/dtos/user-update-dto";
import { useUpdateUser } from "@/core/application/features/organization/user/hooks/useUpdateUser";
import { Role } from "@/core/domain/models/organization/role";
import { User } from "@/core/domain/models/organization/user";
import { limaDistricts } from "@/core/shared/constants/distritcts";
import { Button, Grid } from "@mantine/core";

interface Props {
  user: User; // El usuario que viene de la tabla/lista
}

export default function UpdateUserForm({ user }: Props) {
  const { update, isPending, errorMessage, errorValidation } = useUpdateUser();
  const { data, updateFilter, isLoading } = useGetAllRoles();

  // Mapeamos el usuario a nuestro DTO de actualización
  const initialValues: UserUpdateDto = {
    name: user.name ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
    dni: user.dni ?? "",
    ruc: user.ruc ?? "",
    phone: user.phone ?? "",
    district: user.district ?? "",
    isBlocked: user.isBlocked ?? false,
    roleId: user.role?.id || "", // Asegúrate de que esto coincida con lo que espera el backend
  };

  const handleSubmit = (values: UserUpdateDto) => {
    update({ id: user.id, dto: values });
  };

  return (
    <FormContainer<UserUpdateDto>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={UserUpdateSchema}
      className="space-y-4"
    >
      {errorMessage && <Alert icon message={errorMessage} type="error" />}

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Input
            name="name"
            label="Nombres"
            error={errorValidation.name}
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Input
            name="lastName"
            label="Apellidos:"
            error={errorValidation.lastName}
            required
          />
        </Grid.Col>
      </Grid>

      <Input
        name="email"
        label="Correo electrónico:"
        error={errorValidation.email}
        required
      />

      <Grid>
        <Grid.Col span={6}>
          <Input name="dni" label="DNI:" error={errorValidation.dni} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Input name="ruc" label="RUC:" error={errorValidation.ruc} />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Input name="phone" label="Teléfono:" error={errorValidation.phone} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <SelectInput
            name="district"
            label="Distrito"
            placeholder="Seleccione un distrito"
            options={limaDistricts}
            
          />
        </Grid.Col>
      </Grid>

      <SearchSelect<Role>
        name="roleId"
        label="Buscar Rol"
        className="w-full"
        displayField="name"
        valueField="id"
        options={data?.items || []}
        onSearch={(search) => updateFilter({ search })}
        isLoading={isLoading || isPending}
      />

      <BooleanSelect name="isBlocked" label="¿Usuario bloqueado?" />

      <Button type="submit" loading={isPending}>
        Actualizar Usuario
      </Button>
    </FormContainer>
  );
}
