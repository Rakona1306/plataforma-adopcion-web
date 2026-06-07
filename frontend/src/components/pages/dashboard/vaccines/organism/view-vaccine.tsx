import { Vaccine } from "@/core/domain/models/shelter/vaccine";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { Badge, Grid } from "@mantine/core";

interface ViewVaccineProps {
  vaccine: Vaccine;
}

export function ViewVaccine({ vaccine }: ViewVaccineProps) {
  return (
    <div className="w-full space-y-4">
      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Nombre:</p>
          <p>{vaccine.name}</p>
        </Grid.Col>

        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Estado:</p>
          <Badge color="green">Activa</Badge>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Fecha de creación:</p>
          <p>{formatDateTime(vaccine.createdAt)}</p>
        </Grid.Col>
      </Grid>
    </div>
  );
}