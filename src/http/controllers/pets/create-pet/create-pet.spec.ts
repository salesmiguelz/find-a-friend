import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import createAndAuthenticateOrg from "@/utils/tests/create-and-authenticate-org";
import { PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client";
import { it, beforeAll, afterAll, describe, expect } from "vitest";
import request from "supertest"


describe(("Create Pet Controller e2e"), () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should be able to create a pet", async () => {
        const { token, org } = await createAndAuthenticateOrg(app);

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

        const petResponse = await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send(petData)

        const { pet } = petResponse.body

        expect(petResponse.statusCode).toBe(201)
        expect(pet.id).toEqual(expect.any(String))
    })
})
