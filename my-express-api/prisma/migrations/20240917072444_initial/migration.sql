-- CreateEnum
CREATE TYPE "Recurrence" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'ONCE');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'DKK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT concat('usr_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'DefaultUserName',
    "password" TEXT NOT NULL DEFAULT 'DefaultPassword',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL DEFAULT concat('bgt_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
    "name" TEXT NOT NULL,
    "startingCapital" DOUBLE PRECISION NOT NULL,
    "savings" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItem" (
    "id" TEXT NOT NULL DEFAULT concat('lnt_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'DKK',
    "recurrence" "Recurrence" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL DEFAULT concat('ctg_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
    "name" TEXT NOT NULL DEFAULT 'Default category name',
    "description" TEXT NOT NULL DEFAULT 'A category description for default category name',
    "colorHex" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
