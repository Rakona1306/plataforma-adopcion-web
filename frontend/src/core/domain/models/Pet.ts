import { PetCharacteristics } from "./PetCharacteristics"
import { Race } from "./Race"

export interface Pet {
  id: number
  name: string
  description: string
  age: number
  images: Images[]
  characteristics: PetCharacteristics[]
  race: Race
  breed: string
  gender: string
  isVaccinated: boolean
  history?: string
}

export interface Images {
  id: number
  url: string
}