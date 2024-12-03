import { app } from "@/app"
import createAndAuthenticateOrg from "@/utils/tests/create-and-authenticate-org";
import { describe, beforeAll, afterAll, it, expect } from "vitest"


describe("Authenticate Controller e2e", () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should be able to authenticate an user", async () => {
        const { token } = await createAndAuthenticateOrg(app);
        expect(token).toEqual(expect.any(String))
    })
}) 