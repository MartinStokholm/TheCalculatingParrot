-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'A category description for default category name',
ALTER COLUMN "name" SET DEFAULT 'Default category name';
