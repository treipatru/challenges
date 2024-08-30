-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contact" TEXT NOT NULL,
    "founded" DATETIME NOT NULL,
    "iban" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
