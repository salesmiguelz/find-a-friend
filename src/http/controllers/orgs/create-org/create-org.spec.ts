import { app } from "@/app";
import createAndAuthenticateOrg from "@/utils/tests/create-and-authenticate-org";
import request from "supertest";
import { it, beforeAll, describe, afterAll, expect } from "vitest";

describe("Create Org Controller E2E", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to create an org", async () => {
        const { token } = await createAndAuthenticateOrg(app);
        const orgData = {
            name: "New Beautiful Org",
            email: "beautiful.org@gmail.com",
            password: "123456",
            managerName: "Miguel Sales",
            phone: "40028922",
            city_id: 1,
            state_id: 1
        }
        const orgResponse = await request(app.server).post('/orgs').set('Authorization', `Bearer ${token}`).send(orgData)

        expect(orgResponse.statusCode).toBe(201)
    })
})