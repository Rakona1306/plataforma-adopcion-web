import { Badge } from "@mantine/core";

export const renderStatus = (status: string) => {
    switch (status) {
        case "PENDIENTE":
            return <Badge color="yellow" variant="filled">Pendiente</Badge>;
        case "EN_REVISION":
            return <Badge color="blue" variant="filled">En revisión</Badge>;
        case "APROBADO":
            return <Badge color="green" variant="filled">Aprobada</Badge>;
        case "RECHAZADO":
            return <Badge color="red" variant="filled">Rechazada</Badge>;
        case "CANCELADO":
            return <Badge color="gray" variant="filled">Cancelada</Badge>;
        default:
            return <Badge color="gray" variant="filled">Desconocido</Badge>;
    }
}