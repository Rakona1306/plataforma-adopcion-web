// src/app/dashboard/usuarios/_components/create-user-form.tsx
"use client";

import MultiSelect from "@/app/dashboard/_components/organism/multi-select";
import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import BooleanSelect from "@/components/molecules/boolean-select";
import FormContainer from "@/components/molecules/form-container";
import { SearchSelect } from "@/components/organisms/search-select";
import SelectInput from "@/components/organisms/select-input";
import { useGetAllRoles } from "@/core/application/features/organization/roles/hooks/useGetAllRoles";
import {
  UserCreateDto,
  UserCreateSchema,
} from "@/core/application/features/organization/user/dtos/user-create-dto";
import { useCreateUser } from "@/core/application/features/organization/user/hooks/useCreateUser";
import { Role } from "@/core/domain/models/organization/role";
import { limaDistricts } from "@/core/shared/constants/distritcts";
import { Button, Grid, Select } from "@mantine/core";
import { useField } from "formik";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function CreateUserForm() {
  const { create, isPending, errorMessage, errorValidation } = useCreateUser();
  const { data, updateFilter, isLoading } = useGetAllRoles();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: UserCreateDto = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    dni: "",
    ruc: "",
    phone: "",
    district: "",
    isBlocked: false,
    roleId: "",
  };

  const handleSubmit = (values: UserCreateDto) => {
    console.log("values", values);
    create(values);
  };

  return (
    <FormContainer<UserCreateDto>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={UserCreateSchema}
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
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Input
            name="email"
            label="Correo electrónico:"
            error={errorValidation.email}
            required
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Input
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            error={errorValidation.password}
            placeholder="••••••••"
            rightIcon={
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm font-semibold text-primary hover:text-secondary"
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </div>
            }
            rightIconOnClick={() => setShowPassword(!showPassword)}
          />
        </Grid.Col>
      </Grid>

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

      {/* Aquí integrarías tu hook de opciones de roles */}
      {/*<RoleSelect name="roleId" error={errorValidation.roleId} /> */}
      <SearchSelect<Role>
        name="roleId"
        displayField="name"
        valueField="id"
        label="Buscar Rol"
        className="w-full" // Responsive: completo en móvil, mitad en desktop
        options={data?.items || []}
        onSearch={(search) => updateFilter({ search })}
        isLoading={isLoading}
      />

      <BooleanSelect name="isBlocked" label="¿Usuario bloqueado?" />

      <Button type="submit" loading={isPending}>
        Crear Usuario
      </Button>
    </FormContainer>
  );
}

// Subcomponente simple para el select de roles
function RoleSelect({ name, error }: { name: string; error?: string }) {
  const [field, _, helpers] = useField(name);
  // Reemplaza con tu hook real de opciones
  // const { options } = useRoleOptions();

  return (
    <Select
      label="Rol del usuario"
      data={[]} // Aquí irían tus opciones mapeadas
      value={field.value}
      onChange={(val) => helpers.setValue(val)}
      error={error}
    />
  );
}
