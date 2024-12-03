import { app } from "@/app"
import createAndAuthenticateOrg from "@/utils/tests/create-and-authenticate-org";
import { describe, beforeAll, afterAll, it, expect } from "vitest"
import request from "supertest"


describe("Refresh Token Controller e2e", () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should be able to authenticate an user", async () => {
        const { token, org } = await createAndAuthenticateOrg(app);

        const response = await request(app.server).patch("/token/refresh").send({
            email: org.email,
            password: "123456"
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.token).toEqual(expect.any(String))

    })
}) 