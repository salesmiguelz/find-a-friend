import { Pet, PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType, Prisma } from "@prisma/client";

export interface FilterPetParams {
  type?: PetType
  age?: PetAge
  energy_level?: PetEnergyLevel
  independence_level?: PetIndependenceLevel
  size?: PetSize
  environment_size?: PetEnvironmentSize
  adoption_requirements?: string,
  cityId: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  filter(data: FilterPetParams): Promise<Pet[] | null>
}
