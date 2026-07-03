import { Skeleton, Stack, Group, Box, Grid } from "@mantine/core";

export function PdpSkeleton() {
    return (
        <div className="min-h-screen py-8 md:py-16" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="container mx-auto px-4 md:px-6">
                {/* Back Button Skeleton */}
                <div className="mb-8">
                    <Skeleton height={24} width={150} />
                </div>

                <Grid align="stretch">
                    {/* Left Column - Image Gallery */}
                    <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Stack gap="lg" h="100%">
                            {/* Main Image */}
                            <Box className="sticky top-20">
                                <Skeleton
                                    height={400}
                                    radius="lg"
                                    className="aspect-square md:aspect-auto"
                                />
                            </Box>

                            {/* Thumbnails */}
                            <Group gap="sm" grow wrap="nowrap" className="overflow-x-auto pb-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        height={80}
                                        width={80}
                                        radius="md"
                                        className="flex-shrink-0"
                                    />
                                ))}
                            </Group>

                            {/* Rescue Story */}
                            <Box className="mt-5">
                                <Skeleton height={32} width={200} className="mb-3" />
                                <Stack gap="sm">
                                    <Skeleton height={16} />
                                    <Skeleton height={16} width="80%" />
                                    <Skeleton height={16} width="85%" />
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid.Col>

                    {/* Right Column - Pet Information */}
                    <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Stack gap="lg">
                            {/* Name and Basic Info */}
                            <div className="space-y-4">
                                {/* Title */}
                                <Skeleton height={48} width="70%" className="mb-2" />
                                <Skeleton height={24} width="40%" />

                                {/* Quick Info Cards */}
                                <Grid>
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Grid.Col key={i} span={{ base: 6 }}>
                                            <Box p="md" className="rounded-xl bg-gray-100">
                                                <Skeleton height={16} width="60%" className="mb-2" />
                                                <Skeleton height={24} width="80%" />
                                            </Box>
                                        </Grid.Col>
                                    ))}
                                </Grid>
                            </div>

                            {/* CTA Buttons */}
                            <Stack gap="md" className="pt-6 border-t-2 border-primary/10">
                                <Skeleton height={52} radius="full" />
                                <Skeleton height={52} radius="full" />
                            </Stack>

                            {/* Description */}
                            <div className="space-y-3">
                                <Skeleton height={28} width="30%" />
                                <Stack gap="sm">
                                    <Skeleton height={16} />
                                    <Skeleton height={16} />
                                    <Skeleton height={16} width="80%" />
                                </Stack>
                            </div>

                            {/* Characteristics */}
                            <div className="space-y-3">
                                <Skeleton height={28} width="35%" />
                                <Group gap="sm">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            height={40}
                                            width={120}
                                            radius="full"
                                        />
                                    ))}
                                </Group>
                            </div>

                            {/* Contact CTA */}
                            <Box p="lg" className="rounded-xl bg-blue-50 border border-blue-200">
                                <Stack gap="md" align="center">
                                    <Skeleton height={32} width={32} radius="md" />
                                    <Skeleton height={20} width="40%" />
                                    <Skeleton height={16} width="70%" />
                                    <Skeleton height={40} width={120} radius="full" />
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid.Col>
                </Grid>

                {/* Related Pets Section */}
                <Box className="mt-20">
                    <Skeleton height={40} width="50%" className="mx-auto mb-8" />
                </Box>
            </div>
        </div>
    );
}
