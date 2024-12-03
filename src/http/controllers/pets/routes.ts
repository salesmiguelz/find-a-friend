import { FastifyInstance } from "fastify";
import { createPetController } from "./create-pet/create-pet.controller";
import { filterPetsController } from "./filter-pets/filter-pets-controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt.middleware";
import { petDetailsController } from "./pets-details/pet-details-controller";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, createPetController);
  app.post("/pets/filter", { onRequest: [verifyJWT] }, filterPetsController);
  app.get("/pets/details/:id", { onRequest: [verifyJWT] }, petDetailsController);
}
