import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, it, describe, expect } from "vitest";
import { PetDetailsService } from "./pet-details.service";
import { PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client"

describe("Pet Details Unit Test", () => {
    let petsRepository: InMemoryPetsRepository
    let petDetailsService: PetDetailsService

    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        petDetailsService = new PetDetailsService(petsRepository)
    })

    it("should be able to retrive the details from a pet", async () => {
        const createdPet = await petsRepository.create({
            name: "Cleo",
            about: "A really amazing shih tzu",
            adoption_requirements: "Walk every day",
            age: PetAge.ADULT,
            energy_level: PetEnergyLevel.HIGH,
            environment_size: PetEnvironmentSize.LARGE,
            independence_level: PetIndependenceLevel.HIGH,
            size: PetSize.LARGE,
            type: PetType.DOG,
            org_id: "1",
        })

        const { pet } = await petDetailsService.execute({
            id: createdPet.id
        })

        expect(pet).toEqual(expect.objectContaining({
            id: pet.id
        }))
    })
})