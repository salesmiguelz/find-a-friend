import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs"

export class InMemoryOrgsRepository implements OrgsRepository {

    public orgs: Org[] = []

    async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const org = {
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            password: await hash(data.password, 6),
            managerName: data.managerName,
            phone: data.phone,
            city_id: data.city_id,
            state_id: data.state_id
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


    async findByEmail(email: string): Promise<Org | null> {
        const org = this.orgs.find(org => org.email === email);

        if (!org) {
            return null
        }

        return org
    }
}