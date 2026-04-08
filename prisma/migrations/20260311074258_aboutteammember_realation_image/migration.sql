/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `AboutTeamMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamMemberId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamMemberId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AboutTeamMember" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "teamMemberId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_teamMemberId_key" ON "Image"("teamMemberId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "AboutTeamMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
