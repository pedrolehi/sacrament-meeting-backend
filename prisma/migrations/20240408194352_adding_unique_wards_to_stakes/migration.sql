/*
  Warnings:

  - A unique constraint covering the columns `[name,stake]` on the table `wards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wards_name_stake_key" ON "wards"("name", "stake");
