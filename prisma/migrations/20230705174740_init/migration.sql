/*
  Warnings:

  - You are about to drop the column `seriesalternativeNames` on the `Series` table. All the data in the column will be lost.
  - Added the required column `seriesalternativenames` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "seriesalternativeNames",
ADD COLUMN     "seriesalternativenames" TEXT NOT NULL;
