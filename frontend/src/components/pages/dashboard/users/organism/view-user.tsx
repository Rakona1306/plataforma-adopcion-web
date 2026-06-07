
import { Grid, Text, Badge, Divider, Paper } from "@mantine/core";
import { User } from "@/core/domain/models/organization/user";

interface Props {
  user: User;
}

export function ViewUser({ user }: Props) {
  return (
    <Paper p="md" className="space-y-4">
      {/* Encabezado: Nombre del Usuario */}
      <div className="text-center mb-6">
        <Text size="xl" fw={700}>{user.name}</Text>
        <Badge color={user.isBlocked ? "red" : "green"}>
          {user.isBlocked ? "Bloqueado" : "Activo"}
        </Badge>
      </div>

      <Divider label="Información Personal" labelPosition="center" />

      <Grid>
        <Grid.Col span={6}>
          <Text size="sm" c="dimmed">Email:</Text>
          <Text fw={500}>{user.email}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" c="dimmed">Teléfono:</Text>
          <Text fw={500}>{user.phone || "No registrado"}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" c="dimmed">DNI:</Text>
          <Text fw={500}>{user.dni || "N/A"}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" c="dimmed">RUC:</Text>
          <Text fw={500}>{user.ruc || "N/A"}</Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text size="sm" c="dimmed">Distrito:</Text>
          <Text fw={500}>{user.district || "N/A"}</Text>
        </Grid.Col>
      </Grid>
      
      <Divider label="Configuración" labelPosition="center" />
      
      <Text size="sm" c="dimmed">Rol asignado:</Text>
      <Text fw={500}>{user.role ? user.role.name : "Sin asignar"}</Text>
    </Paper>
  );
}