import { FastifyInstance } from "fastify";
import { example } from "./controllers/example.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/example", example);
}
