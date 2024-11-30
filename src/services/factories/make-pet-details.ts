import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetDetailsService } from "../pet-details/pet-details.service";

export function makePetDetailsService() {
  const petsRepository = new PrismaPetsRepository();
  const petDetailsService = new PetDetailsService(petsRepository);

  return petDetailsService;
}
