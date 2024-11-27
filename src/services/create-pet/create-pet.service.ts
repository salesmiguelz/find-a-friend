import { PetsRepository } from "@/repositories/pets-repository";
import { Pet, PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client";

interface CreatePetServiceRequest {
  name: string,
  about: string,
  adoption_requirements: string,
  age: PetAge,
  energy_level: PetEnergyLevel,
  environment_size: PetEnvironmentSize,
  independence_level: PetIndependenceLevel,
  size: PetSize,
  type: PetType,
  org_id: string
}

interface CreatePetServiceResponse {
  pet: Pet;
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ name, about, adoption_requirements, age, energy_level, environment_size, independence_level, org_id, size, type }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      adoption_requirements,
      age,
      energy_level,
      environment_size,
      independence_level,
      org_id,
      size,
      type
    })

    return {
      pet
    }
  }
}
