/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `signature` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "signature_user_id_key" ON "signature"("user_id");
