/*
  Warnings:

  - You are about to drop the column `titleVideo` on the `HomeInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HomeInfo" DROP COLUMN "titleVideo";

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeInfoId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_homeInfoId_key" ON "Video"("homeInfoId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_homeInfoId_fkey" FOREIGN KEY ("homeInfoId") REFERENCES "HomeInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
