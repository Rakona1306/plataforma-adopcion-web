import React from 'react'
import {
    Container,
    Paper,
    Group,
    Badge,
    Text,
    Stack,
    Divider,
    Button,
    Modal,
    Textarea,
    SimpleGrid,
    Card,
    ThemeIcon,
    ActionIcon,
    CopyButton,
    Tooltip
} from '@mantine/core'
import {
    MdCheckCircle,
    MdSchedule,
    MdCancel,
    MdContentCopy,
    MdArrowBack,
    MdHome,
    MdPets,
    MdPhone,
    MdLocationOn,
    MdPerson,
    MdCalendarToday,
    MdMessage,
    MdNotes,
    MdVerifiedUser
} from 'react-icons/md'
import { useMediaQuery } from '@mantine/hooks'
import { RequestAdoptionResponse } from '../dto/request-adoption-response'

interface Props {
    request: RequestAdoptionResponse
    onBack?: () => void
    onApprove?: (comment: string) => Promise<void>
    onReject?: (comment: string) => Promise<void>
}

const STATUS_CONFIG = {
    pending: { color: 'yellow', label: 'Pendiente', icon: MdSchedule },
    approved: { color: 'green', label: 'Aprobado', icon: MdCheckCircle },
    rejected: { color: 'red', label: 'Rechazado', icon: MdCancel }
}

const TYPE_CONFIG = {
    adoption: { label: 'Adopción', color: 'blue' },
    donation: { label: 'Donación', color: 'grape' },
    sponsorship: { label: 'Apadrinamiento', color: 'cyan' },
    volunteer: { label: 'Voluntariado', color: 'orange' }
}

export default function AdoptionReviewView({
    request,
    onBack,
    onApprove,
    onReject
}: Props) {
    const [reviewModalOpen, setReviewModalOpen] = React.useState(false)
    const [reviewComment, setReviewComment] = React.useState('')
    const [isApproving, setIsApproving] = React.useState(false)
    const [isRejecting, setIsRejecting] = React.useState(false)
    const isMobile = useMediaQuery('(max-width: 768px)')

    const statusConfig = STATUS_CONFIG[request.status as keyof typeof STATUS_CONFIG]
    const typeConfig = TYPE_CONFIG[request.type as keyof typeof TYPE_CONFIG]
    const StatusIcon = statusConfig?.icon || MdSchedule

    const handleApprove = async () => {
        setIsApproving(true)
        try {
            await onApprove?.(reviewComment)
            setReviewModalOpen(false)
            setReviewComment('')
        } finally {
            setIsApproving(false)
        }
    }

    const handleReject = async () => {
        setIsRejecting(true)
        try {
            await onReject?.(reviewComment)
            setReviewModalOpen(false)
            setReviewComment('')
        } finally {
            setIsRejecting(false)
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <Container size="lg" py={{ base: 'md', md: 'lg' }}>
            {/* Header */}
            <Group justify="space-between" mb="xl">
                {onBack && (
                    <ActionIcon variant="light" onClick={onBack}>
                        <MdArrowBack size={20} />
                    </ActionIcon>
                )}
                <Group>
                    <Badge
                        size="lg"
                        variant="light"
                        color={statusConfig?.color}
                        leftSection={<StatusIcon size={16} />}
                    >
                        {statusConfig?.label}
                    </Badge>
                    <Badge size="lg" color={typeConfig?.color}>
                        {typeConfig?.label}
                    </Badge>
                </Group>
            </Group>

            {/* Información del Solicitante */}
            <Paper p="md" radius="md" mb="lg" withBorder>
                <Stack gap="md">
                    <Group justify="space-between">
                        <Text fw={600} size="lg">
                            Información del Solicitante
                        </Text>
                        <CopyButton value={request.userId} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copiado' : 'Copiar ID'} withArrow position="right">
                                    <ActionIcon
                                        color={copied ? 'teal' : 'gray'}
                                        variant="subtle"
                                        onClick={copy}
                                    >
                                        {copied ? <MdCheckCircle size={16} /> : <MdContentCopy size={16} />}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Group>

                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                        <Card withBorder p="md" radius="md" bg="gray.0">
                            <Group mb="xs">
                                <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                                    <MdPerson size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xs" fw={500} c="dimmed">
                                        Nombre
                                    </Text>
                                    <Text fw={600}>{request.userName}</Text>
                                </div>
                            </Group>
                        </Card>

                        <Card withBorder p="md" radius="md" bg="gray.0">
                            <Group mb="xs">
                                <ThemeIcon variant="light" size="lg" radius="md" color="grape">
                                    <MdPhone size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xs" fw={500} c="dimmed">
                                        Teléfono
                                    </Text>
                                    <Text fw={600}>{request.phone}</Text>
                                </div>
                            </Group>
                        </Card>

                        <Card withBorder p="md" radius="md" bg="gray.0">
                            <Group mb="xs">
                                <ThemeIcon variant="light" size="lg" radius="md" color="cyan">
                                    <MdLocationOn size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xs" fw={500} c="dimmed">
                                        Distrito
                                    </Text>
                                    <Text fw={600}>{request.district}</Text>
                                </div>
                            </Group>
                        </Card>
                    </SimpleGrid>
                </Stack>
            </Paper>

            {/* Motivación */}
            <Paper p="md" radius="md" mb="lg" withBorder>
                <Stack gap="md">
                    <Group>
                        <ThemeIcon variant="light" size="lg" radius="md" color="indigo">
                            <MdMessage size={20} />
                        </ThemeIcon>
                        <Text fw={600} size="md">
                            Motivación
                        </Text>
                    </Group>
                    <Paper p="md" radius="md" bg="gray.0">
                        <Text size="sm" style={{ lineHeight: 1.6 }}>
                            {request.motivation}
                        </Text>
                    </Paper>
                </Stack>
            </Paper>

            {/* Datos de Adopción */}
            {request.type === 'adoption' && (
                <Paper p="md" radius="md" mb="lg" withBorder>
                    <Stack gap="md">
                        <Group>
                            <ThemeIcon variant="light" size="lg" radius="md" color="teal">
                                <MdHome size={20} />
                            </ThemeIcon>
                            <Text fw={600} size="md">
                                Detalles de Adopción
                            </Text>
                        </Group>

                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                            <Card withBorder p="md" radius="md" bg="gray.0">
                                <Text size="xs" fw={500} c="dimmed" mb="xs">
                                    Tipo de Vivienda
                                </Text>
                                <Text fw={600}>{request.houseType || 'No especificado'}</Text>
                            </Card>

                            <Card withBorder p="md" radius="md" bg="gray.0">
                                <Text size="xs" fw={500} c="dimmed" mb="xs">
                                    Otras Mascotas
                                </Text>
                                <Badge
                                    color={request.hasOtherPets ? 'orange' : 'green'}
                                    variant="light"
                                >
                                    {request.hasOtherPets ? 'Sí' : 'No'}
                                </Badge>
                            </Card>

                            <Card withBorder p="md" radius="md" bg="gray.0">
                                <Text size="xs" fw={500} c="dimmed" mb="xs">
                                    Tiene Hijos
                                </Text>
                                <Badge
                                    color={request.hasChildren ? 'orange' : 'green'}
                                    variant="light"
                                >
                                    {request.hasChildren ? 'Sí' : 'No'}
                                </Badge>
                            </Card>

                            <Card withBorder p="md" radius="md" bg="gray.0">
                                <Text size="xs" fw={500} c="dimmed" mb="xs">
                                    Acepta Visita Domiciliaria
                                </Text>
                                <Badge
                                    color={request.acceptHomeVisit ? 'green' : 'red'}
                                    variant="light"
                                >
                                    {request.acceptHomeVisit ? 'Sí' : 'No'}
                                </Badge>
                            </Card>
                        </SimpleGrid>

                        {request.petName && (
                            <Paper p="md" radius="md" bg="blue.0">
                                <Group>
                                    <ThemeIcon variant="light" size="lg" color="blue">
                                        <MdPets size={20} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="xs" fw={500} c="dimmed">
                                            Mascota Interesada
                                        </Text>
                                        <Text fw={600}>{request.petName}</Text>
                                    </div>
                                </Group>
                            </Paper>
                        )}
                    </Stack>
                </Paper>
            )}

            {/* Notas Adicionales */}
            {request.notes && (
                <Paper p="md" radius="md" mb="lg" withBorder>
                    <Stack gap="md">
                        <Group>
                            <ThemeIcon variant="light" size="lg" radius="md" color="amber">
                                <MdNotes size={20} />
                            </ThemeIcon>
                            <Text fw={600} size="md">
                                Notas Adicionales
                            </Text>
                        </Group>
                        <Paper p="md" radius="md" bg="gray.0">
                            <Text size="sm" style={{ lineHeight: 1.6 }}>
                                {request.notes}
                            </Text>
                        </Paper>
                    </Stack>
                </Paper>
            )}

            <Divider my="lg" />

            {/* Información de Revisión */}
            <Paper p="md" radius="md" mb="lg" withBorder bg="gray.0">
                <Stack gap="md">
                    <Text fw={600} size="md">
                        Historial de Revisión
                    </Text>

                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                        <Card withBorder p="md" radius="md">
                            <Group mb="xs">
                                <ThemeIcon variant="light" size="lg" color="blue">
                                    <MdCalendarToday size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xs" fw={500} c="dimmed">
                                        Fecha de Solicitud
                                    </Text>
                                    <Text fw={600} size="sm">
                                        {formatDate(request.createdAt)}
                                    </Text>
                                </div>
                            </Group>
                        </Card>

                        {request.reviewedAt && (
                            <Card withBorder p="md" radius="md">
                                <Group mb="xs">
                                    <ThemeIcon variant="light" size="lg" color="green">
                                        <MdCheckCircle size={20} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="xs" fw={500} c="dimmed">
                                            Fecha de Revisión
                                        </Text>
                                        <Text fw={600} size="sm">
                                            {formatDate(request.reviewedAt)}
                                        </Text>
                                    </div>
                                </Group>
                            </Card>
                        )}

                        {request.reviewerName && (
                            <Card withBorder p="md" radius="md">
                                <Group mb="xs">
                                    <ThemeIcon variant="light" size="lg" color="purple">
                                        <MdVerifiedUser size={20} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="xs" fw={500} c="dimmed">
                                            Revisado por
                                        </Text>
                                        <Text fw={600} size="sm">
                                            {request.reviewerName}
                                        </Text>
                                    </div>
                                </Group>
                            </Card>
                        )}
                    </SimpleGrid>

                    {request.reviewComment && (
                        <Paper p="md" radius="md" bg="blue.0">
                            <Stack gap="xs">
                                <Text fw={600} size="sm">
                                    Comentario del Revisor
                                </Text>
                                <Text size="sm" style={{ lineHeight: 1.6 }}>
                                    {request.reviewComment}
                                </Text>
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            </Paper>

            {/* Acciones */}
            {request.status === 'pending' && (
                <Group justify="flex-end" gap="md">
                    <Button
                        variant="light"
                        color="red"
                        onClick={() => setReviewModalOpen(true)}
                        disabled={isApproving || isRejecting}
                        fullWidth={isMobile}
                    >
                        Rechazar Solicitud
                    </Button>
                    <Button
                        color="green"
                        onClick={() => setReviewModalOpen(true)}
                        disabled={isApproving || isRejecting}
                        fullWidth={isMobile}
                    >
                        Aprobar Solicitud
                    </Button>
                </Group>
            )}

            {/* Modal de Revisión */}
            <Modal
                opened={reviewModalOpen}
                onClose={() => {
                    setReviewModalOpen(false)
                    setReviewComment('')
                }}
                title="Revisar Solicitud"
                size={isMobile ? 'full' : 'md'}
                centered
            >
                <Stack gap="md">
                    <Textarea
                        label="Comentario de Revisión"
                        placeholder="Escribe tu comentario aquí..."
                        minRows={5}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.currentTarget.value)}
                        disabled={isApproving || isRejecting}
                    />

                    <Group justify="flex-end" gap="md">
                        <Button
                            variant="light"
                            onClick={() => {
                                setReviewModalOpen(false)
                                setReviewComment('')
                            }}
                            disabled={isApproving || isRejecting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color="red"
                            onClick={handleReject}
                            loading={isRejecting}
                            disabled={isApproving}
                        >
                            Rechazar
                        </Button>
                        <Button
                            color="green"
                            onClick={handleApprove}
                            loading={isApproving}
                            disabled={isRejecting}
                        >
                            Aprobar
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Container>
    )
}