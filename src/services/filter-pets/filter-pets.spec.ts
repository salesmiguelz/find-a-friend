import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client";
import { describe, beforeEach, expect, it } from "vitest";

describe(("Filter Pets Unit Test"), () => {
    let petsRepository: InMemoryPetsRepository

    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
    })

    it("should filter the pets", async () => {
        const firstPet = {
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
        }

        const secondPet = {
            name: "Paçoca",
            about: "A really amazing orange cat",
            adoption_requirements: "Buy good food",
            age: PetAge.ADULT,
            energy_level: PetEnergyLevel.HIGH,
            environment_size: PetEnvironmentSize.LARGE,
            independence_level: PetIndependenceLevel.HIGH,
            size: PetSize.LARGE,
            type: PetType.CAT,
            org_id: "1",
        }

        petsRepository.create(firstPet)
        petsRepository.create(secondPet)

        const filteredPets = await petsRepository.filter({
            type: "DOG",
            age: "ADULT",
            adoption_requirements: "Walk every day",
            energy_level: "HIGH",
            environment_size: "LARGE",
            independence_level: "HIGH",
            size: "LARGE",
            cityId: 1
        })

        expect(filteredPets).toEqual([
            expect.objectContaining(firstPet)
        ])

    })
})