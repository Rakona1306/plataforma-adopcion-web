import { Trait } from "@/core/domain/models/shelter/trait";
import { Grid } from "@mantine/core";

export function ViewTrait({ trait }: { trait: Trait }) {
  return (
    <div className="w-full space-y-4">
      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Nombre:</p>
          <p>{trait.name}</p>
        </Grid.Col>

        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">ID:</p>
          <p>{trait.id}</p>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Creado en:</p>
          <p>{new Date(trait.createdAt).toLocaleDateString()}</p>
        </Grid.Col>

        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p className="font-bold">Hora:</p>
          <p>
            {new Date(trait.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </Grid.Col>
      </Grid>
    </div>
  );
}