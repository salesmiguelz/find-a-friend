import { Example, Prisma } from "@prisma/client";
import { ExamplesRepository } from "../examples-repository";
import { randomUUID } from "crypto";

export class InMemoryExamplesRepository implements ExamplesRepository {
  public items: Example[] = [];

  async create(data: Prisma.ExampleCreateInput) {
    const example = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
    };
    this.items.push(example);

    return example;
  }

  async findById(id: string) {
    const example = this.items.find((item) => item.id === id);

    if (!example) {
      return null;
    }

    return example;
  }
}
