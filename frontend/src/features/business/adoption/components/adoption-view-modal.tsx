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
} from "@mantine/core";
import {
  MdCheckCircle,
  MdPets,
  MdPhone,
  MdLocationOn,
  MdPerson,
  MdCalendarToday,
  MdVerifiedUser,
  MdHome,
  MdNotes,
  MdEditCalendar,
} from "react-icons/md";
import { AdoptionResponse } from "../dto/dashboard/adoption-response";
import { montserrat } from "@/lib/fonts/monserrat";

interface Props {
  adoption: AdoptionResponse;
}

export default function AdoptionViewModal({ adoption }: Props) {
  const { requestAdoption } = adoption;

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
      {/* Información de la Adopción */}
      <Paper p="md" radius="md" mb="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={600} size="lg" className={`${montserrat.className}`}>
              Información de la Adopción
            </Text>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction="column" gap="xs">
                <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                  <MdEditCalendar size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Fecha de Adopción
                  </Text>
                  <Text fw={600}>{formatDate(adoption.adoptionDate)}</Text>
                </div>
              </Flex>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction="column" gap="xs">
                <ThemeIcon variant="light" size="lg" radius="md" color="teal">
                  <MdPets size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Mascota
                  </Text>
                  <Text fw={600}>{requestAdoption.pet.name}</Text>
                </div>
              </Flex>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction="column" gap="xs">
                <ThemeIcon variant="light" size="lg" radius="md" color="grape">
                  <MdHome size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Tipo de Vivienda
                  </Text>
                  <Text fw={600}>
                    {requestAdoption.houseType || "No especificado"}
                  </Text>
                </div>
              </Flex>
            </Card>
          </SimpleGrid>

          {adoption.observations && (
            <Paper p="md" radius="md" bg="gray.0">
              <Stack gap="xs">
                <Group gap="xs">
                  <ThemeIcon variant="light" size="sm" color="dark">
                    <MdNotes size={14} />
                  </ThemeIcon>
                  <Text fw={600} size="sm">
                    Observaciones
                  </Text>
                </Group>
                <Text size="sm" style={{ lineHeight: 1.6 }}>
                  {adoption.observations}
                </Text>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Paper>

      {/* Información del Adoptante */}
      <Paper p="md" radius="md" mb="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={600} size="lg" className={`${montserrat.className}`}>
              Información del Adoptante
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
                  {requestAdoption.user.name} {requestAdoption.user.lastName}
                </Text>
              </div>
            </Group>
          </Card>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction="column" gap="xs">
                <ThemeIcon variant="light" size="lg" radius="md" color="teal">
                  <MdPhone size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Teléfono
                  </Text>
                  <Text fw={600}>{requestAdoption.phone}</Text>
                </div>
              </Flex>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction="column" gap="xs">
                <ThemeIcon variant="light" size="lg" radius="md" color="cyan">
                  <MdLocationOn size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Distrito
                  </Text>
                  <Text fw={600}>{requestAdoption.district}</Text>
                </div>
              </Flex>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Flex direction="column" gap="xs">
                <ThemeIcon variant="light" size="lg" radius="md" color="grape">
                  <MdLocationOn size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Dirección
                  </Text>
                  <Text fw={600}>{requestAdoption.address}</Text>
                </div>
              </Flex>
            </Card>
          </SimpleGrid>
        </Stack>
      </Paper>

      {/* Datos de la Solicitud */}
      <Paper p="md" radius="md" mb="lg" withBorder>
        <Stack gap="md">
          <Group>
            <Text fw={600} size="md" className={`${montserrat.className}`}>
              Detalles de la Solicitud
            </Text>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Card withBorder p="md" radius="md" bg="gray.0">
              <Text size="xs" fw={500} c="dimmed" mb="xs">
                Otras Mascotas
              </Text>
              <Badge
                color={requestAdoption.hasOtherPets ? "green" : "red"}
                variant="light"
              >
                {requestAdoption.hasOtherPets ? "Sí" : "No"}
              </Badge>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Text size="xs" fw={500} c="dimmed" mb="xs">
                Tiene Hijos
              </Text>
              <Badge
                color={requestAdoption.hasChildren ? "green" : "red"}
                variant="light"
              >
                {requestAdoption.hasChildren ? "Sí" : "No"}
              </Badge>
            </Card>

            <Card withBorder p="md" radius="md" bg="gray.0">
              <Text size="xs" fw={500} c="dimmed" mb="xs">
                Acepta Visita Domiciliaria
              </Text>
              <Badge
                color={requestAdoption.acceptHomeVisit ? "green" : "red"}
                variant="light"
              >
                {requestAdoption.acceptHomeVisit ? "Sí" : "No"}
              </Badge>
            </Card>

            {requestAdoption.reference && (
              <Card withBorder p="md" radius="md" bg="gray.0">
                <Text size="xs" fw={500} c="dimmed" mb="xs">
                  Referencia
                </Text>
                <Text fw={600}>{requestAdoption.reference}</Text>
              </Card>
            )}
          </SimpleGrid>
        </Stack>
      </Paper>

      <Divider my="lg" />

      {/* Información de Revisión / Auditoría */}
      <Paper p="md" radius="md" mb="lg" withBorder bg="gray.0">
        <Stack gap="md">
          <Text fw={600} size="md" className={`${montserrat.className}`}>
            Auditoría
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Card withBorder p="md" radius="md">
              <Group mb="xs">
                <ThemeIcon variant="light" size="lg" color="blue">
                  <MdCalendarToday size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Fecha de Creación
                  </Text>
                  <Text fw={600} size="sm">
                    {formatDate(adoption.createdAt)}
                  </Text>
                </div>
              </Group>
            </Card>

            <Card withBorder p="md" radius="md">
              <Group mb="xs">
                <ThemeIcon variant="light" size="lg" color="green">
                  <MdCheckCircle size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={500} c="dimmed">
                    Última Actualización
                  </Text>
                  <Text fw={600} size="sm">
                    {formatDate(adoption.lastUpdatedAt)}
                  </Text>
                </div>
              </Group>
            </Card>

            {requestAdoption.reviewer && (
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
                      {requestAdoption.reviewer.name}{" "}
                      {requestAdoption.reviewer.lastName}
                    </Text>
                  </div>
                </Group>
              </Card>
            )}
          </SimpleGrid>
        </Stack>
      </Paper>
    </div>
  );
}
