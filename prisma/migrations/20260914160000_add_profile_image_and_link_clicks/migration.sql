-- AlterTable
ALTER TABLE "User" ADD COLUMN "image" TEXT;

-- AlterTable
ALTER TABLE "Link" ADD COLUMN "clicks" INTEGER NOT NULL DEFAULT 0;
