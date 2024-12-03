import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PetAge, PetEnergyLevel, PetEnvironmentSize, PetIndependenceLevel, PetSize, PetType } from "@prisma/client";
import { makeCreatePetService } from "@/services/factories/make-create-pet-service";
import { makeFilterPetsService } from "@/services/factories/make-filter-pets-service";

export async function filterPetsController(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsBodySchema = z.object({
    type: z.nativeEnum(PetType).optional(),
    age: z.nativeEnum(PetAge).optional(),
    energy_level: z.nativeEnum(PetEnergyLevel).optional(),
    independence_level: z.nativeEnum(PetIndependenceLevel).optional(),
    size: z.nativeEnum(PetSize).optional(),
    environment_size: z.nativeEnum(PetEnvironmentSize).optional(),
    adoption_requirements: z.string().optional(),
    cityId: z.number()
  });

  const data = filterPetsBodySchema.parse(request.body);

  const filterPetsService = makeFilterPetsService();

  const { pets } = await filterPetsService.execute(data);

  return reply.status(200).send({ pets });
}
