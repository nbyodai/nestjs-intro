/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `flavor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "flavor_name_key" ON "flavor"("name");
