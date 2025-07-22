/*
  Warnings:

  - You are about to drop the column `day` on the `Tours` table. All the data in the column will be lost.
  - You are about to drop the column `introduce` on the `Tours` table. All the data in the column will be lost.
  - You are about to drop the column `places_name` on the `Tours` table. All the data in the column will be lost.
  - Added the required column `description` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxGuests` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Tours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tours" DROP COLUMN "day",
DROP COLUMN "introduce",
DROP COLUMN "places_name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "included" TEXT[],
ADD COLUMN     "maxGuests" INTEGER NOT NULL,
ADD COLUMN     "notIncluded" TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
