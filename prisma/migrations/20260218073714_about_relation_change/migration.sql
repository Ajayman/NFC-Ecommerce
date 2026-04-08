/*
  Warnings:

  - You are about to drop the `AboutMainSection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `aboutId` to the `AboutCoreValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aboutId` to the `AboutTeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AboutCoreValue" ADD COLUMN     "aboutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AboutTeamMember" ADD COLUMN     "aboutId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AboutMainSection";

-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AboutTeamMember" ADD CONSTRAINT "AboutTeamMember_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutCoreValue" ADD CONSTRAINT "AboutCoreValue_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
