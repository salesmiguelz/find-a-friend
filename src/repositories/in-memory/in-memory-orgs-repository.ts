import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
    public orgs: Org[] = []

    async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const org = {
            id: data.id ?? randomUUID(),
            name: "Fancy Org",
            email: "fancy.org@gmail.com",
            password: "123456",
            managerName: "Miguel Sales",
            phone: "40028922",
            city_id: 1,
            state_id: 1
        }
        this.orgs.push(org)

        return org
    }
    async findById(id: string): Promise<Org | null> {
        const org = this.orgs.find(org => org.id === id);

        if (!org) {
            return null
        }
        return org;
    }

}