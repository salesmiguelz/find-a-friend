import { Prisma, Pet } from "@prisma/client";
import { FilterPetParams, PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export class PrismaPetsRepository implements PetsRepository {
    async filter({ type, age, energy_level, independence_level, size, environment_size, adoption_requirements, cityId }: FilterPetParams): Promise<Pet[] | null> {
        const pets = await prisma.pet.findMany({
            where: {
                type,
                age,
                energy_level,
                independence_level,
                size,
                environment_size,
                adoption_requirements,
                Org: {
                    city_id: cityId
                }
            }
        })

        return pets;
    }
    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data: {
                id: randomUUID(),
                ...data
            }
        })
        return pet;
    }
    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findFirst({
            where: {
                id
            }
        })

        return pet;
    }

}