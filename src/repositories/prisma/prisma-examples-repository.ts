import { prisma } from "@/lib/prisma";
import { ExamplesRepository } from "../examples-repository";
import { Example, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class PrismaExamplesRepository implements ExamplesRepository {
  async create(data: Prisma.ExampleCreateInput) {
    const example = await prisma.example.create({
      data: {
        id: randomUUID(),
        name: data.name,
        email: data.email,
      },
    });

    return example;
  }
  async findById(id: string): Promise<Example | null> {
    const user = await prisma.example.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
