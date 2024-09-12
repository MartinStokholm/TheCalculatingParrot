/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LineItem" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
