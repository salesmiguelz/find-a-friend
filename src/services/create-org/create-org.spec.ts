import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { CreateOrgService } from "./create-org.service";
import { create } from "domain";

describe("Create Org Unit Test", () => {
    let orgsRepository: InMemoryOrgsRepository
    let createOrgService: CreateOrgService
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        createOrgService = new CreateOrgService(orgsRepository)
    })
    it("should be able to create an org", async () => {
        const orgData = {
            name: "Fancy Org",
            email: "fancy.org@gmail.com",
            password: "123456",
            managerName: "Miguel Sales",
            phone: "40028922",
            city_id: 1,
            state_id: 1
        }

        const { org } = await createOrgService.execute(orgData)


        expect(org).toEqual(expect.objectContaining({
            name: "Fancy Org"
        }))

    })
})