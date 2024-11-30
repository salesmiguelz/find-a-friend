import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FilterPetsService } from "../filter-pets/filter-pets.service";

export function makeFilterPetsService() {
  const petsRepository = new PrismaPetsRepository();
  const filterPetsService = new FilterPetsService(petsRepository);

  return filterPetsService;
}
