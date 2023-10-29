/*
  Warnings:

  - Added the required column `totalValue` to the `PlainSignature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "signature" DROP CONSTRAINT "signature_type_signature_fkey";

-- DropIndex
DROP INDEX "PlainSignature_plain_name_key";

-- AlterTable
ALTER TABLE "PlainSignature" ADD COLUMN     "totalValue" DECIMAL(65,30) NOT NULL;
