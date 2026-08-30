"use client";

import { useModal } from "@/core/application/hooks/ui/useModal";
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { MdLocationOn, MdPets, MdPhone, MdVisibility } from "react-icons/md";
import { formatDateTime } from "@/core/shared/helpers/formatDateTime";
import { RequestAdoptionResponse } from "@/features/business/request-adoptions/dto/dashboard/request-adoption";

export default function AccountAdoptionRequestCard({
  request,
}: {
  request: RequestAdoptionResponse;
}) {
  const { handleOpenModal } = useModal() || {};

  const handleOpenRequestDetail = () => {
    handleOpenModal?.({
      header: `Solicitud #${request.id}`,
      content: <RequestDetail request={request} />,
    });
  };

  return (
    <Grid.Col
      span={{ base: 12, sm: 6, md: 4, lg: 3 }}
      h={"100%"}
      className="flex! justify-start!"
    >
      <Card
        withBorder
        shadow="sm"
        radius="md"
        h="100%"
        w={"100%"}
        classNames={{
          root: `border-2! flex! flex-col! ${request.status === "APROBADO" ? "border-green-500!" : ""}`,
        }}
      >
        <Stack gap="md" h={"100%"} mih={"0px"}>
          <Group justify="space-between">
            <Text fw={600}>Estado: </Text>
            <Badge
              color={
                request.status === "APROBADO"
                  ? "green"
                  : request.status === "RECHAZADO" ||
                      request.status === "CANCELADO"
                    ? "red"
                    : "yellow"
              }
            >
              {request.status}
            </Badge>
          </Group>

          <Stack gap={4} h={"max-content"} mih={"0px"}>
            <Group gap={6}>
              <MdPets size={18} />
              <Text fw={600}>{request.pet.name ?? "Mascota"}</Text>
            </Group>

            <Group gap={6}>
              <MdLocationOn size={18} />
              <Text size="sm" c="dimmed">
                {request.district}
              </Text>
            </Group>

            <Group gap={6}>
              <MdPhone size={18} />
              <Text size="sm">{request.phone}</Text>
            </Group>
          </Stack>

          <Divider />

          <Text lineClamp={3} size="sm">
            {request.motivation}
          </Text>

          {request.reviewer.id && (
            <>
              <Divider />
              <Text fw={600}>Revisado por: {request.reviewer.name}</Text>
              <Text size="sm" c="dimmed">
                Fecha de revisión: {formatDateTime(request.reviewedAt ?? "")}
              </Text>
              <div className="bg-gray-200 py-5 px-4 rounded-2xl">
                <Text
                  size="sm"
                  c="dimmed"
                  classNames={{
                    root: "text-slate-700! font-bold! text-xs! leading-5! tracking-wide! text-justify!",
                  }}
                >
                  {request.reviewComment}
                </Text>
              </div>
              <Divider />
            </>
          )}

          <Button
            variant="light"
            leftSection={<MdVisibility className="text-white" size={18} />}
            onClick={handleOpenRequestDetail}
            fullWidth
            classNames={{
              root: "bg-primary!",
              label: "text-white!",
            }}
          >
            Ver detalle
          </Button>
        </Stack>
      </Card>
    </Grid.Col>
  );
}

function RequestDetail({ request }: { request: RequestAdoptionResponse }) {
  const rows = [
    { label: "Solicitante", value: request.user.name },
    { label: "Mascota", value: request.pet.name ?? "-" },
    { label: "Estado", value: request.status },
    { label: "Distrito", value: request.district },
    { label: "Teléfono", value: request.phone },
    { label: "Fecha de solicitud", value: request.createdAt },
    { label: "Motivación", value: request.motivation },
    { label: "Notas", value: request.motivation ?? "-" },
    { label: "Tipo de vivienda", value: request.houseType ?? "-" },
    {
      label: "Tiene otras mascotas",
      value:
        request.hasOtherPets == null ? "-" : request.hasOtherPets ? "Sí" : "No",
    },
    {
      label: "Tiene niños",
      value:
        request.hasChildren == null ? "-" : request.hasChildren ? "Sí" : "No",
    },
    {
      label: "Acepta visita",
      value:
        request.acceptHomeVisit == null
          ? "-"
          : request.acceptHomeVisit
            ? "Sí"
            : "No",
    },
    { label: "Revisado por", value: request.reviewer.name ?? "-" },
    { label: "Fecha de revisión", value: request.reviewedAt ?? "-" },
    { label: "Comentario", value: request.reviewComment ?? "-" },
  ];

  return (
    <Stack gap="sm">
      {rows.map((row) => (
        <Group key={row.label} justify="space-between" align="start">
          <Text fw={600}>{row.label}</Text>
          <Text maw="60%" ta="right" c="dimmed">
            {row.value}
          </Text>
        </Group>
      ))}
    </Stack>
  );
}
