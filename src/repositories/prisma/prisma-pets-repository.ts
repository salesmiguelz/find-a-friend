import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export class PrismaPetsRepository implements PetsRepository {
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