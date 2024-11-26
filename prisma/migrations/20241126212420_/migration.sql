/*
  Warnings:

  - The values [puppy,teen,adult] on the enum `PetAge` will be removed. If these variants are still used in the database, this will fail.
  - The values [low,medium,high] on the enum `PetEnergyLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [small,medium,large] on the enum `PetEnvironmentSize` will be removed. If these variants are still used in the database, this will fail.
  - The values [low,medium,high] on the enum `PetIndependenceLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [small,medium,large] on the enum `PetSize` will be removed. If these variants are still used in the database, this will fail.
  - The values [dog,cat] on the enum `PetType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PetAge_new" AS ENUM ('PUPPY', 'TEEN', 'ADULT');
ALTER TABLE "pets" ALTER COLUMN "age" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "age" TYPE "PetAge_new" USING ("age"::text::"PetAge_new");
ALTER TYPE "PetAge" RENAME TO "PetAge_old";
ALTER TYPE "PetAge_new" RENAME TO "PetAge";
DROP TYPE "PetAge_old";
ALTER TABLE "pets" ALTER COLUMN "age" SET DEFAULT 'PUPPY';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetEnergyLevel_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "pets" ALTER COLUMN "energy_level" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "energy_level" TYPE "PetEnergyLevel_new" USING ("energy_level"::text::"PetEnergyLevel_new");
ALTER TYPE "PetEnergyLevel" RENAME TO "PetEnergyLevel_old";
ALTER TYPE "PetEnergyLevel_new" RENAME TO "PetEnergyLevel";
DROP TYPE "PetEnergyLevel_old";
ALTER TABLE "pets" ALTER COLUMN "energy_level" SET DEFAULT 'LOW';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetEnvironmentSize_new" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');
ALTER TABLE "pets" ALTER COLUMN "environment_size" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "environment_size" TYPE "PetEnvironmentSize_new" USING ("environment_size"::text::"PetEnvironmentSize_new");
ALTER TYPE "PetEnvironmentSize" RENAME TO "PetEnvironmentSize_old";
ALTER TYPE "PetEnvironmentSize_new" RENAME TO "PetEnvironmentSize";
DROP TYPE "PetEnvironmentSize_old";
ALTER TABLE "pets" ALTER COLUMN "environment_size" SET DEFAULT 'SMALL';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetIndependenceLevel_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "pets" ALTER COLUMN "independence_level" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "independence_level" TYPE "PetIndependenceLevel_new" USING ("independence_level"::text::"PetIndependenceLevel_new");
ALTER TYPE "PetIndependenceLevel" RENAME TO "PetIndependenceLevel_old";
ALTER TYPE "PetIndependenceLevel_new" RENAME TO "PetIndependenceLevel";
DROP TYPE "PetIndependenceLevel_old";
ALTER TABLE "pets" ALTER COLUMN "independence_level" SET DEFAULT 'LOW';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetSize_new" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');
ALTER TABLE "pets" ALTER COLUMN "size" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "PetSize_new" USING ("size"::text::"PetSize_new");
ALTER TYPE "PetSize" RENAME TO "PetSize_old";
ALTER TYPE "PetSize_new" RENAME TO "PetSize";
DROP TYPE "PetSize_old";
ALTER TABLE "pets" ALTER COLUMN "size" SET DEFAULT 'SMALL';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetType_new" AS ENUM ('DOG', 'CAT');
ALTER TABLE "pets" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "type" TYPE "PetType_new" USING ("type"::text::"PetType_new");
ALTER TYPE "PetType" RENAME TO "PetType_old";
ALTER TYPE "PetType_new" RENAME TO "PetType";
DROP TYPE "PetType_old";
ALTER TABLE "pets" ALTER COLUMN "type" SET DEFAULT 'DOG';
COMMIT;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "type" SET DEFAULT 'DOG',
ALTER COLUMN "age" SET DEFAULT 'PUPPY',
ALTER COLUMN "size" SET DEFAULT 'SMALL',
ALTER COLUMN "energy_level" SET DEFAULT 'LOW',
ALTER COLUMN "environment_size" SET DEFAULT 'SMALL',
ALTER COLUMN "independence_level" SET DEFAULT 'LOW';
