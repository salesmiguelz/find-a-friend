import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgService } from "../create-org/create-org.service";

export function makeCreateOrgService() {
  const orgsRepository = new PrismaOrgsRepository();
  const createOrgService = new CreateOrgService(orgsRepository);

  return createOrgService;
}
