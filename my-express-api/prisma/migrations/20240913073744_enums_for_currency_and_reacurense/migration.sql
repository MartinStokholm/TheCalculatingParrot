/*
  Warnings:

  - You are about to drop the `Reacurring` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Recurrence" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'DKK');

-- DropForeignKey
ALTER TABLE "Reacurring" DROP CONSTRAINT "Reacurring_lineItemId_fkey";

-- AlterTable
ALTER TABLE "LineItem" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'DKK',
ADD COLUMN     "recurrence" "Recurrence";

-- DropTable
DROP TABLE "Reacurring";
