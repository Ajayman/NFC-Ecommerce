/*
  Warnings:

  - You are about to drop the column `teamMemberId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_teamMemberId_fkey";

-- DropIndex
DROP INDEX "Image_teamMemberId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "teamMemberId";
