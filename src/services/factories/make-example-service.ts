import { PrismaExamplesRepository } from "@/repositories/prisma/prisma-examples-repository";
import { ExampleService } from "../example.service";

export function makeExampleService() {
  const exaplesRepository = new PrismaExamplesRepository();
  const exampleService = new ExampleService(exaplesRepository);

  return exampleService;
}
