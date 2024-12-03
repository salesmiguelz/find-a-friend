import { describe, it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import { app } from "@/app";
import createAndAuthenticateOrg from "@/utils/tests/create-and-authenticate-org";
import { PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client";
import { prisma } from "@/lib/prisma";



describe("Pet Details Controller e2e", () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should be able to retrieve a pet's details", async () => {
        const { org, token } = await createAndAuthenticateOrg(app)

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
            org_id: org.id,
        }

        const pet = await prisma.pet.create({
            data: petData
        })

        const response = await request(app.server).get(`/pets/details/${pet.id}`).set('Authorization', `Bearer ${token}`)



        expect(response.statusCode).toBe(200)
        expect(response.body.pet).toEqual(
            expect.objectContaining({
                name: petData.name
            })
        )
    })
})
