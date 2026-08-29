'use client'

import Title from "@/app/(web)/_components/atoms/title"
import Container from "@/components/atoms/container"
import AccountAdoptioRequestCard from "@/features/business/adoption/components/account/adoption-request-card"
import usePaginateAdoptionRequest from "@/features/business/adoption/hooks/use-paginate-adoption-request"
import { useProfile } from "@/features/system/auth/hooks/useProfile"
import { montserrat } from "@/lib/fonts/monserrat"
import { Grid, Skeleton } from "@mantine/core"

export default function AccountRequestPage() {

    const { profile } = useProfile()
    const { data: adoptionRequests, isLoading } = usePaginateAdoptionRequest({
        filter: {
            page: 1,
            pageSize: 4,
            userId: profile?.id,
        }
    })

    return (
        <div className="w-full pb-10 bg-gray-100">
            <Container className="py-10">
                <Title htmlTag="h1" className={`text-center font-extrabold! lg:text-5xl! ${montserrat.className}`}>Mis Solicitudes</Title>
            </Container>


            <Container>
                {
                    isLoading ? (
                        <>
                            <Loading />
                        </>
                    ) : (
                        <div className="space-y-5">
                            <h2 className={`text-3xl font-bold ${montserrat.className} text-primary`}>Adopción</h2>
                            <Grid align="stretch">
                                {
                                    adoptionRequests && adoptionRequests.items.length && adoptionRequests.items.map((request) => (
                                        <AccountAdoptioRequestCard key={request.id} request={request} />
                                    ))
                                }
                            </Grid>
                        </div>
                    )
                }
            </Container>
        </div>
    )
}

function Loading() {
    return (
        <div className="space-y-5">
            <Skeleton height={38} width={220} radius="md" />

            <Grid>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Grid.Col
                        key={index}
                        span={{ base: 12, sm: 6, md: 4 }}
                    >
                        <div className="bg-white p-5 rounded-md shadow-sm shadow-black/20 border-2 border-gray-300 space-y-4">
                            <Skeleton height={140} radius="md" />

                            <Skeleton height={22} width="75%" radius="xl" />

                            <Skeleton height={16} width="100%" />
                            <Skeleton height={16} width="85%" />
                            <Skeleton height={16} width="60%" />

                            <div className="pt-2 space-y-2">
                                <Skeleton height={36} radius="md" />
                                <Skeleton height={36} radius="md" />
                            </div>
                        </div>
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
}