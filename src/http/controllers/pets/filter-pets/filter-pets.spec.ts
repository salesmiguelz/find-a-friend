import { app } from "@/app"
import createAndAuthenticateOrg from "@/utils/tests/create-and-authenticate-org";
import { PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType, Prisma } from "@prisma/client";
import { describe, beforeAll, afterAll, it, expect } from "vitest"
import request from "supertest"
import { prisma } from "@/lib/prisma";



describe("Filter Pets Controller e2e", () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should be able to filter pets", async () => {
        const { org, token } = await createAndAuthenticateOrg(app);
        const firstPetData = {
            name: "Cleo",
            about: "A really amazing shih tzu",
            adoption_requirements: "Walk every day",
            age: PetAge.ADULT,
            energy_level: PetEnergyLevel.HIGH,
            environment_size: PetEnvironmentSize.LARGE,
            independence_level: PetIndependenceLevel.HIGH,
            size: PetSize.LARGE,
            type: PetType.DOG,
            org_id: org.id,
        }

        const secondPetData = {
            name: "Paçoca",
            about: "A really amazing orange cat",
            adoption_requirements: "Buy good food",
            age: PetAge.ADULT,
            energy_level: PetEnergyLevel.HIGH,
            environment_size: PetEnvironmentSize.LARGE,
            independence_level: PetIndependenceLevel.HIGH,
            size: PetSize.LARGE,
            type: PetType.CAT,
            org_id: org.id,
        }

        await prisma.pet.create({
            data: firstPetData
        })

        await prisma.pet.create({
            data: secondPetData
        })

        const response = await request(app.server).post("/pets/filter").set('Authorization', `Bearer ${token}`).send({
            type: "DOG",
            age: "ADULT",
            adoption_requirements: "Walk every day",
            energy_level: "HIGH",
            environment_size: "LARGE",
            independence_level: "HIGH",
            size: "LARGE",
            cityId: 1
        });

        const pets = response.body.pets

        expect(response.statusCode).toBe(200);
        expect(pets).toHaveLength(1)
    })
}) 