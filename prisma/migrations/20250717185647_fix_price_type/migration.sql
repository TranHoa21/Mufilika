/*
  Warnings:

  - You are about to drop the column `address` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Tour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TourInDay` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `tourId` on the `BookingItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tourId` on the `Testimonial` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BookingItem" DROP CONSTRAINT "BookingItem_tourId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_tourId_fkey";

-- DropForeignKey
ALTER TABLE "TourInDay" DROP CONSTRAINT "TourInDay_slugTour_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "address";

-- AlterTable
ALTER TABLE "BookingItem" DROP COLUMN "tourId",
ADD COLUMN     "tourId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "canonicalUrl" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "postType" TEXT NOT NULL DEFAULT 'article',
ADD COLUMN     "readingTime" INTEGER,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "tourId",
ADD COLUMN     "tourId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tour";

-- DropTable
DROP TABLE "TourInDay";

-- CreateTable
CREATE TABLE "Tours" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "link" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "places_name" TEXT NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "day" VARCHAR(255) NOT NULL,
    "introduce" TEXT NOT NULL,

    CONSTRAINT "Tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tourdatas" (
    "id" SERIAL NOT NULL,
    "tourId" INTEGER,
    "title_tour" VARCHAR(255) NOT NULL,
    "name_day" TEXT,
    "image_hotel" VARCHAR(255),
    "image_in_day" VARCHAR(255),
    "name_day_title" TEXT,
    "name_hotel" TEXT,
    "schedule" TEXT,
    "hotel_introduction" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tourdatas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tours_link_key" ON "Tours"("link");

-- AddForeignKey
ALTER TABLE "Tourdatas" ADD CONSTRAINT "Tourdatas_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingItem" ADD CONSTRAINT "BookingItem_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
