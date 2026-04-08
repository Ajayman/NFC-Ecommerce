-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailSubText" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationSubText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);
