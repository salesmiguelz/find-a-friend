import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
    public pets: Pet[] = [];
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: data.id ?? randomUUID(),
            name: data.name,
            about: data.about,
            adoption_requirements: data.adoption_requirements,
            age: data.age,
            energy_level: data.energy_level,
            environment_size: data.environment_size,
            independence_level: data.independence_level,
            size: data.size,
            type: data.type,
            org_id: data.org_id
        }
        this.pets.push(pet);
        return pet;
    }
    async findById(id: string) {
        const pet = this.pets.find(pet => pet.id === id);

        if (!pet) {
            return null
        }
        return pet;
    }
}