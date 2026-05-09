/*
  Warnings:

  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EMPLOYEE', 'EMPLOYER', 'CLIENT');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "isVerified",
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;
