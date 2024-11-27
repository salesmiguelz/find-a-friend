import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { CreatePetService } from "./create-pet.service"
import { it, describe, beforeEach, expect } from "vitest";
import { PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client"

describe("Create Pet Service Unit Test", () => {
  let petsRepository: InMemoryPetsRepository
  let createPetService: CreatePetService

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    createPetService = new CreatePetService(petsRepository)
  })

  it("should be able to create a pet", async () => {
    const petData = {
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

    const { pet } = await createPetService.execute(petData)

    expect(pet).toEqual(
      expect.objectContaining({
        name: "Cleo"
      })
    )

  })
})