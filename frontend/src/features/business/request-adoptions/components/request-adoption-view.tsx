import {
  Paper,
  Group,
  Badge,
  Text,
  Stack,
  Divider,
  SimpleGrid,
  Card,
  ThemeIcon,
  Flex,
  Pill,
} from "@mantine/core";
import {
  MdCheckCircle,
  MdPets,
  MdPhone,
  MdLocationOn,
  MdPerson,
  MdCalendarToday,
  MdVerifiedUser,
  MdTypeSpecimen,
  MdSignalWifiStatusbar1Bar,
} from "react-icons/md";
import { RequestAdoptionResponse } from "../dto/dashboard/request-adoption";
import { montserrat } from "@/lib/fonts/monserrat";
import { CardSimIcon } from "lucide-react";

interface Props {
  request: RequestAdoptionResponse;
  onBack?: () => void;
  onApprove?: (comment: string) => Promise<void>;
  onReject?: (comment: string) => Promise<void>;
}

export default function AdoptionReviewView({ request }: Props) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full">
      {/* Información del Solicitante */}
      <Paper p="md" radius="md" mb="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={600} size="lg" className={`${montserrat.className}`}>
              Información del Solicitante
            </Text>
          </Group>

          <Card withBorder p="md" radius="md" bg="gray.0">
            <Group>
              <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                <MdPerson size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" fw={500} c="dimmed">
                  Nombre
                </Text>
                <Text fw={600}>
                  {request.user.name} {request.user.lastName}
                </Text>
              </div>
            </Group>
          </Card>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction={"column"} gap={"xs"}>
                <ThemeIcon variant="light" size="lg" radius="md" color="teal">
                  <CardSimIcon size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Dni
                  </Text>
                  <Text fw={600}>{request.user.dni}</Text>
                </div>
              </Flex>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction={"column"} gap={"xs"}>
                <ThemeIcon variant="light" size="lg" radius="md" color="grape">
                  <MdPhone size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Teléfono
                  </Text>
                  <Text fw={600}>{request.phone}</Text>
                </div>
              </Flex>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction={"column"} gap={"xs"}>
                <ThemeIcon variant="light" size="lg" radius="md" color="cyan">
                  <MdLocationOn size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Distrito
                  </Text>
                  <Text fw={600}>{request.district}</Text>
                </div>
              </Flex>
            </Card>
          </SimpleGrid>
        </Stack>
      </Paper>

      <Paper p="md" radius="md" mb="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={600} size="lg" className={`${montserrat.className}`}>
              Información de la mascota
            </Text>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Card withBorder p="md" radius="md" bg="gray.0">
              <Group>
                <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                  <MdPets size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Nombre
                  </Text>
                  <Text fw={600}>{request.pet.name}</Text>
                </div>
              </Group>
            </Card>
            <Card withBorder p="md" radius="md" bg="gray.0">
              <Group>
                <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                  <MdTypeSpecimen size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Especie
                  </Text>
                  <Text fw={600}>{request.pet.specie?.name}</Text>
                </div>
              </Group>
            </Card>
          </SimpleGrid>

          <Card withBorder p="md" radius="md" bg="gray.0">
            <Stack gap={"xs"}>
              <Text size="xs" c="dimmed" fw={500}>
                Razas
              </Text>
              <Flex gap={"xs"} wrap={"wrap"}>
                {request.pet.breeds.map((breed) => (
                  <Pill
                    className="text-xs! w-fit! bg-primary! text-white!"
                    key={`${breed.id}:${breed.name}`}
                  >
                    {breed.name}
                  </Pill>
                ))}
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </Paper>

      {/* Motivación */}
      <Paper p="md" radius="md" mb="lg" withBorder>
        <Stack gap="md">
          <Group>
            <Text fw={600} size="md" className={`${montserrat.className}`}>
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

      <Paper p="md" radius="md" mb="lg" withBorder>
        <Stack gap="md">
          <Group>
            <Text fw={600} size="md" className={`${montserrat.className}`}>
              Detalles de Adopción
            </Text>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Card withBorder p="md" radius="md" bg="gray.0">
              <Text size="xs" fw={500} c="dimmed" mb="xs">
                Tipo de Vivienda
              </Text>
              <Text fw={600}>{request.houseType || "No especificado"}</Text>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Text size="xs" fw={500} c="dimmed" mb="xs">
                Otras Mascotas
              </Text>
              <Badge
                color={request.hasOtherPets ? "green" : "red"}
                variant="light"
              >
                {request.hasOtherPets ? "Sí" : "No"}
              </Badge>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Text size="xs" fw={500} c="dimmed" mb="xs">
                Tiene Hijos
              </Text>
              <Badge
                color={request.hasChildren ? "green" : "red"}
                variant="light"
              >
                {request.hasChildren ? "Sí" : "No"}
              </Badge>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Text size="xs" fw={500} c="dimmed" mb="xs">
                Acepta Visita Domiciliaria
              </Text>
              <Badge
                color={request.acceptHomeVisit ? "green" : "red"}
                variant="light"
              >
                {request.acceptHomeVisit ? "Sí" : "No"}
              </Badge>
            </Card>
          </SimpleGrid>
        </Stack>
      </Paper>

      <Divider my="lg" />

      {/* Información de Revisión */}
      <Paper p="md" radius="md" mb="lg" withBorder bg="gray.0">
        <Stack gap="md">
          <Text fw={600} size="md" className={`${montserrat.className}`}>
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

            {request.reviewer && (
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
                      {request.reviewer.name} {request.reviewer.lastName}
                    </Text>
                  </div>
                </Group>
              </Card>
            )}

            <Card
              withBorder
              p="md"
              radius="md"
              display={"flex"}
              className="justify-center"
            >
              <Group mb="xs">
                <ThemeIcon variant="light" size="lg" color="dark">
                  <MdSignalWifiStatusbar1Bar size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Estado
                  </Text>
                  <Text fw={600} size="sm">
                    {request.status}
                  </Text>
                </div>
              </Group>
            </Card>
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
    </div>
  );
}
