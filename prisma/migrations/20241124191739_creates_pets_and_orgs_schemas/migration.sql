-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('dog', 'cat');

-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('puppy', 'teen', 'adult');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "PetEnergyLevel" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "PetIndependenceLevel" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "PetEnvironmentSize" AS ENUM ('small', 'medium', 'large');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "type" "PetType" NOT NULL DEFAULT 'dog',
    "age" "PetAge" NOT NULL DEFAULT 'puppy',
    "energyLevel" "PetEnergyLevel" NOT NULL DEFAULT 'low',
    "independenceLevel" "PetIndependenceLevel" NOT NULL DEFAULT 'low',
    "size" "PetSize" NOT NULL DEFAULT 'small',
    "environmentSize" "PetEnvironmentSize" NOT NULL DEFAULT 'small',
    "photos" TEXT[],
    "adoptionRequirements" TEXT[],
    "orgId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "managerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "orgAddressId" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs_addresses" (
    "id" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "orgs_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_orgAddressId_fkey" FOREIGN KEY ("orgAddressId") REFERENCES "orgs_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
