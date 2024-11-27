import { PetsRepository } from "@/repositories/pets-repository"
import { Pet } from "@prisma/client"
import { PetNotFoundError } from "../errors/pet-not-foud-error"

interface PetDetailsRequest {
    id: string
}

interface PetDetailsResponse {
    pet: Pet
}


export class PetDetailsService {
    constructor(private petsRepository: PetsRepository) { }

    async execute({ id }: PetDetailsRequest): Promise<PetDetailsResponse> {
        const pet = await this.petsRepository.findById(id)

        if (!pet) {
            throw new PetNotFoundError()
        }

        return { pet }
    }
}