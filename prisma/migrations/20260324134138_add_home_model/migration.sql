-- CreateTable
CREATE TABLE "HomeInfo" (
    "id" TEXT NOT NULL,
    "titleVideo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeInfo_pkey" PRIMARY KEY ("id")
);
