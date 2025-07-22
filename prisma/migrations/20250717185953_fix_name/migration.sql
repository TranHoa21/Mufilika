/*
  Warnings:

  - You are about to drop the column `link` on the `Tours` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Tours` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Tours` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Tours` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tours_link_key";

-- AlterTable
ALTER TABLE "Tours" DROP COLUMN "link",
DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tours_slug_key" ON "Tours"("slug");
