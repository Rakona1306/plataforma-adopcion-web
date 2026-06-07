import { Role } from "@/core/domain/models/organization/role";
import { Badge, Grid } from "@mantine/core";

interface ViewRoleProps {
  role: Role;
}

export function ViewRole({ role }: ViewRoleProps) {
  return (
    <div className="w-full space-y-4">
      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Nombre:</p>
          <p>{role.name}</p>
        </Grid.Col>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Tiene acceso al dashboard?</p>

          {role.toDashboard ? (
            <Badge color="green">Sí</Badge>
          ) : (
            <Badge color="red">No</Badge>
          )}
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Permisos:</p>
          <div className="flex gap-3 items-center mt-2">
            {role.permissions.map((permission, index) => (
              <Badge key={index} color="blue" className="w-fit">
                {permission.name}
              </Badge>
            ))}
          </div>
        </Grid.Col>

        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Creado en: </p>
          <p>{new Date(role.createdAt).toLocaleDateString()}</p>
        </Grid.Col>
      </Grid>

      <section className="w-full">
        <p className="font-bold">Descripción:</p>
        <p>
          {role.description !== null && role.description !== ""
            ? role.description
            : "No hay descripción"}
        </p>
      </section>
    </div>
  );
}
