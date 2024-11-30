import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs"
import { OrgNotFoundError } from "@/services/errors/org-not-found-error";

export class PrismaOrgsRepository implements OrgsRepository {
    async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const org = await prisma.org.create({
            data: {
                id: randomUUID(),
                name: data.name,
                email: data.email,
                password: await hash(data.password, 6),
                managerName: data.managerName,
                phone: data.phone,
                city_id: 1,
                state_id: 1,
            }
        })

        return org
    }
    async findById(id: string): Promise<Org | null> {
        const org = prisma.org.findUnique({
            where: {
                id
            }
        })

        if (!org) {
            throw new OrgNotFoundError();
        }

        return org;
    }
}