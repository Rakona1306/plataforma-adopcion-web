import { PetRelation } from "../../pet/model/pet-relation.model"
import { VaccineRelation } from "../../vaccine/model/vaccine-relation.model"

/**
 * Lo que retorna del GET
 */
export interface PetVaccine {
    id: string
    petId: string
    vaccineId: string
    appliedDate: Date
    expirationDate: Date
    isExperied: boolean

    pet: PetRelation
    vaccine: VaccineRelation
}