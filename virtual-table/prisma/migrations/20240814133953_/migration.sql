/*
  Warnings:

  - A unique constraint covering the columns `[iban]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Company_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Company_iban_key" ON "Company"("iban");
