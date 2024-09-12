/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reacurring` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "id" SET DEFAULT concat('ctg_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "LineItem" ALTER COLUMN "categoryId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Reacurring" DROP CONSTRAINT "Reacurring_pkey",
ALTER COLUMN "id" SET DEFAULT concat('rcg_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reacurring_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reacurring_id_seq";
