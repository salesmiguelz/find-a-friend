import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest"

export default async function createAndAuthenticateOrg(app: FastifyInstance) {
    await prisma.state.create({
        data: {
            id: 1,
            name: 'Minas Gerais',
            uf: 'MG'
        }
    })
    await prisma.city.create({
        data: {
            id: 1,
            name: 'My city',
            state: 1,
            uf: 'MG',
        }
    })

    const org = await prisma.org.create({
        data: {
            name: "Fancy Org",
            email: "fancy.org@gmail.com",
            password: await hash("123456", 6),
            managerName: "Miguel Sales",
            phone: "40028922",
            city_id: 1,
            state_id: 1
        }
    });

    const response = await request(app.server).post('/login').send({
        email: "fancy.org@gmail.com",
        password: "123456",
    })

    const { token } = response.body
    return { token, org }
}