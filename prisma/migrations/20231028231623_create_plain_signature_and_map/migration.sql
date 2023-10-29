/*
  Warnings:

  - You are about to drop the `PlainSignature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PlainSignature";

-- CreateTable
CREATE TABLE "plainsignature" (
    "plain_id" TEXT NOT NULL,
    "plain_name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount_price" INTEGER NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "plainsignature_pkey" PRIMARY KEY ("plain_id")
);
