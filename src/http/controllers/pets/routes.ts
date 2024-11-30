import { FastifyInstance } from "fastify";
import { createPetController } from "./create-pet/create-pet-controller";
import { filterPetsController } from "./filter-pets/filter-pets-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/pets", createPetController);
  app.post("/filter-pets", filterPetsController);
}
