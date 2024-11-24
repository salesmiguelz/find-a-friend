import { ExamplesRepository } from "@/repositories/examples-repository";
import { Example } from "@prisma/client";
import { ExampleError } from "./errors/example-error";

interface ExampleServiceRequest {
  shouldError: boolean;
}

interface ExampleServiceResponse {
  example: Example;
}

export class ExampleService {
  constructor(private examplesRepository: ExamplesRepository) {}

  async execute({
    shouldError,
  }: ExampleServiceRequest): Promise<ExampleServiceResponse> {
    // Implementar qualquer regra de negócio
    const example = await this.examplesRepository.create({
      name: "John Doe",
      email: "XKtX5@example.com",
    });

    // Throw com erros personailizados
    if (shouldError) {
      throw new ExampleError();
    }

    return {
      example,
    };
  }
}
