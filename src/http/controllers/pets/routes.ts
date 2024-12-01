import { FastifyInstance } from "fastify";
import { createPetController } from "./create-pet/create-pet-controller";
import { filterPetsController } from "./filter-pets/filter-pets-controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt.middleware";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, createPetController);
  app.post("/filter-pets", filterPetsController);
}
