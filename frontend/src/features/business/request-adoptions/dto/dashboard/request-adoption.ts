import { User } from "@/core/domain/models/organization/user"
import { Pet } from "@/core/domain/models/shelter/pet"

export interface RequestAdoptionResponse {
    id: number
    petId: string
    userId: string
    houseType: string
    hasOtherPets: boolean
    hasChildren: boolean
    acceptHomeVisit: boolean
    district: string
    phone: string
    addres: string
    reference: string
    motivation: string
    status: string
    createdAt: string
    reviewComment: string
    reviewedAt: string

    user: User
    pet: Pet
    review: User
}

export enum RequestAdoptionStatus {
    PENDIENTE = 1,
    EN_REVISION = 2,
    RECHAZADO = 4,
    APROBADO = 3,
    CANCELADO = 5
}