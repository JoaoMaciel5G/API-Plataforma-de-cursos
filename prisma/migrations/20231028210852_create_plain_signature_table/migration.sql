/*
  Warnings:

  - You are about to drop the column `discount_price` on the `signature` table. All the data in the column will be lost.
  - You are about to drop the column `plain_name` on the `signature` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `signature` table. All the data in the column will be lost.
  - Added the required column `type_signature` to the `signature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "signature" DROP COLUMN "discount_price",
DROP COLUMN "plain_name",
DROP COLUMN "price",
ADD COLUMN     "type_signature" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PlainSignature" (
    "plain_id" TEXT NOT NULL,
    "plain_name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount_price" INTEGER NOT NULL,

    CONSTRAINT "PlainSignature_pkey" PRIMARY KEY ("plain_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlainSignature_plain_name_key" ON "PlainSignature"("plain_name");

-- AddForeignKey
ALTER TABLE "signature" ADD CONSTRAINT "signature_type_signature_fkey" FOREIGN KEY ("type_signature") REFERENCES "PlainSignature"("plain_name") ON DELETE RESTRICT ON UPDATE CASCADE;
