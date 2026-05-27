import { Role } from "@/core/domain/models/organization/role"
import { Grid } from "@mantine/core"

interface ViewRoleProps {
  role: Role
}

export function ViewRole({ role }: ViewRoleProps) {
  return (
    <div className="w-full">
      <Grid>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p>{role.name}</p>
        </Grid.Col>
        <Grid.Col span={{ lg: 6, base: 12 }}>
          <p>{role.name}</p>
        </Grid.Col>
      </Grid>
    </div>
  )
}