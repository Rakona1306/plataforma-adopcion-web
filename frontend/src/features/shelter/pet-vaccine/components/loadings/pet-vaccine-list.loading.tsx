import { Grid, Skeleton } from "@mantine/core";

export default function PetVaccineListLoading() {
    return (
        <div className="space-y-5">
            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Skeleton w={'100%'} h={'300px'} radius={20} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Skeleton w={'100%'} h={'300px'} radius={20} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Skeleton w={'100%'} h={'300px'} radius={20} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Skeleton w={'100%'} h={'300px'} radius={20} />
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Skeleton w={'100%'} h={'300px'} radius={20} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Skeleton w={'100%'} h={'300px'} radius={20} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Skeleton w={'100%'} h={'300px'} radius={20} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Skeleton w={'100%'} h={'300px'} radius={20} />
                </Grid.Col>
            </Grid>
        </div>
    )
}