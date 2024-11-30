import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makePetDetailsService } from "@/services/factories/make-pet-details";

export async function petDetailsController(request: FastifyRequest, reply: FastifyReply) {
  const petDetailsBodySchema = z.object({
    id: z.string().uuid(),
  });

  const data = petDetailsBodySchema.parse(request.body);

  const petDetailsService = makePetDetailsService();

  const { pet } = await petDetailsService.execute(data);

  return reply.status(201).send({ pet });
}
