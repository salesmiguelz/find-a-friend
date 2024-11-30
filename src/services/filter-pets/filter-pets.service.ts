import { FilterPetParams, PetsRepository } from "@/repositories/pets-repository"
import { Pet, PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client"
import { NoPetsMatchFilters } from "../errors/no-pets-match-filters"


interface FilterPetsRequest {
    type: PetType
    age: PetAge
    energy_level: PetEnergyLevel
    independence_level: PetIndependenceLevel
    size: PetSize
    environment_size: PetEnvironmentSize
    adoption_requirements: string,
    cityId: number
}

interface FilterPetsResponse {
    pets: Pet[]
}


export class FilterPets {
    constructor(private petsRepository: PetsRepository) { }

    async execute(queries: FilterPetsRequest): Promise<FilterPetsResponse> {
        const pets = await this.petsRepository.filter(queries);

        if (!pets) {
            throw new NoPetsMatchFilters()
        }

        return {
            pets
        }
    }
}