import { Example, Prisma } from "@prisma/client";

export interface ExamplesRepository {
  create(data: Prisma.ExampleCreateInput): Promise<Example>;
  findById(id: string): Promise<Example | null>;
}
