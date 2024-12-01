import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateOrgService } from "@/services/factories/make-create-org-service";

export async function createOrgController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    managerName: z.string(),
    phone: z.string(),
    city_id: z.number(),
    state_id: z.number(),
  })

  const data = registerBodySchema.parse(request.body);

  const createOrgService = makeCreateOrgService();

  const { org } = await createOrgService.execute(data);

  return reply.status(201).send({ org });
}
