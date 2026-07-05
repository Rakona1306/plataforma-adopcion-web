export interface RequestAdoptionResponse {
    id: string;
    userId: string;
    userName: string;
    type: string;
    status: string;
    motivation: string;
    district: string;
    phone: string;
    notes?: string | null;
    petId: string;
    petName?: string | null;

    // Adopción
    houseType?: string | null;
    hasOtherPets?: boolean;
    hasChildren?: boolean;
    acceptHomeVisit?: boolean;

    // Revisión
    createdAt: string;
    reviewedAt?: string | null;
    reviewedBy?: string | null;
    reviewerName?: string | null;
    reviewComment?: string | null;
}

export type RequestResponse = RequestAdoptionResponse;
