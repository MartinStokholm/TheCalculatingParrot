/*
  Warnings:

  - The primary key for the `Budget` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_budgetId_fkey";

-- AlterTable
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_pkey",
ALTER COLUMN "id" SET DEFAULT concat('bgt_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Budget_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Budget_id_seq";

-- AlterTable
ALTER TABLE "LineItem" ALTER COLUMN "budgetId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
