/*
  Warnings:

  - You are about to drop the column `discount_price` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "discount_price",
DROP COLUMN "price",
DROP COLUMN "totalValue";
