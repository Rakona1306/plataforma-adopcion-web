import { AdopRequestAdoptionResponse } from "../relations/adop-request-adoption-response";

export interface AdoptionResponse {
    // Identificación
    id: number;

    // Solicitud de adopción
    requestAdoptionId: number;

    // Información de la adopción
    adoptionDate: string;
    status: string
    observations: string | null;

    // Auditoría
    createdAt: string;
    createdBy: string | null;
    lastUpdatedAt: string;
    updatedBy: string | null;

    // Relación
    requestAdoption: AdopRequestAdoptionResponse;
}