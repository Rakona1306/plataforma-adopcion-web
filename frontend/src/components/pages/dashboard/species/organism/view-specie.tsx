import { Specie } from "@/core/domain/models/shelter/specie";
import { Grid } from "@mantine/core";

export function ViewSpecie({ specie }: { specie: Specie }) {
  return (
    <div className="w-full space-y-4">
      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Nombre:</p>
          <p>{specie.name}</p>
        </Grid.Col>

        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">ID:</p>
          <p>{specie.id}</p>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Creado en:</p>
          <p>{new Date(specie.createdAt).toLocaleDateString()}</p>
        </Grid.Col>

        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Hora:</p>
          <p>
            {new Date(specie.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </Grid.Col>
      </Grid>
    </div>
  );
}