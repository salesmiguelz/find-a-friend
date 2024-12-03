import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client";
import { makeCreatePetService } from "@/services/factories/make-create-pet-service";

export async function createPetController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    adoption_requirements: z.string(),
    age: z.nativeEnum(PetAge),
    energy_level: z.nativeEnum(PetEnergyLevel),
    environment_size: z.nativeEnum(PetEnvironmentSize),
    independence_level: z.nativeEnum(PetIndependenceLevel),
    size: z.nativeEnum(PetSize),
    type: z.nativeEnum(PetType),
    org_id: z.string()
  });

  const data = registerBodySchema.parse(request.body);

  const createPetService = makeCreatePetService();

  const { pet } = await createPetService.execute(data);

  return reply.status(201).send({ pet });
}
