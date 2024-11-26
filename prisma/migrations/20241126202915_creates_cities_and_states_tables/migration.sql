/*
  Warnings:

  - You are about to drop the column `orgAddressId` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `adoptionRequirements` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `energyLevel` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `environmentSize` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `independenceLevel` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `orgs_addresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city_id` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_orgAddressId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "orgAddressId",
ADD COLUMN     "city_id" INTEGER NOT NULL,
ADD COLUMN     "state_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adoptionRequirements",
DROP COLUMN "energyLevel",
DROP COLUMN "environmentSize",
DROP COLUMN "independenceLevel",
DROP COLUMN "orgId",
ADD COLUMN     "adoption_requirements" TEXT[],
ADD COLUMN     "energy_level" "PetEnergyLevel" NOT NULL DEFAULT 'low',
ADD COLUMN     "environment_size" "PetEnvironmentSize" NOT NULL DEFAULT 'small',
ADD COLUMN     "independence_level" "PetIndependenceLevel" NOT NULL DEFAULT 'low',
ADD COLUMN     "org_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "orgs_addresses";

-- CreateTable
CREATE TABLE "cities" (
    "id" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_id_key" ON "cities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "states_id_key" ON "states"("id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
