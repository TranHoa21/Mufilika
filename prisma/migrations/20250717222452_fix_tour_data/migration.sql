/*
  Warnings:

  - You are about to drop the column `title_tour` on the `Tourdatas` table. All the data in the column will be lost.
  - You are about to drop the column `included` on the `Tours` table. All the data in the column will be lost.
  - You are about to drop the column `notIncluded` on the `Tours` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tourdatas" DROP COLUMN "title_tour";

-- AlterTable
ALTER TABLE "Tours" DROP COLUMN "included",
DROP COLUMN "notIncluded";
