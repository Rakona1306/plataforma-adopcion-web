import { PetRelation } from "../../pet/model/pet-relation.model";

export interface MedicalRecord {
    id: string
    pet: PetRelation
    petId: string
    notes: string
    visitDate: Date
    diagnosis: string
    requiresFollowUp: boolean
    createdAt: Date
}