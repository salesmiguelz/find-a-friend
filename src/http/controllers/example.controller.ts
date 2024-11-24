import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeExampleService } from "@/services/factories/make-example-service";

export async function example(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const { name, email } = registerBodySchema.parse(request.body);

  try {
    // * Instancia os repositórios que serão necessários
    // const examplesRepository = new PrismaExampleRepository();

    // * Instancia os serviços que serão necessários, já passando os repositórios como parâmetro (inversão de dependência)
    // const registerService = new RegisterService(usersRepositories);

    // * Ao invés de instanciar os repositórios e os serviços aqui, é possível optar por um factory pattern
    // * Factory pattern
    const exampleService = makeExampleService();

    // * Executa o serviço
    const { example } = await exampleService.execute({ shouldError: false });

    return reply.status(201).send({ example });
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return reply.status(409).send({ message: err.message });
    // }
    // throw err; // TODO: fix me
  }

  // return reply.status(201).send();
}
