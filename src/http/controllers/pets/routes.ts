import { FastifyInstance } from "fastify";
import { createPetController } from "./create-pet/create-pet-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/pets", createPetController);
}
