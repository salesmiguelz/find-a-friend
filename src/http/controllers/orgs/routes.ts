import { FastifyInstance } from "fastify";
import { createOrgController } from "./create-org/create-org.controller";
import { authenticateController } from "./authenticate.controller";
import { refreshController } from "./refresh.controller";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController);
  app.post("/login", authenticateController)
  app.patch("/token/refresh", refreshController)
}
