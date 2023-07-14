/*
  Warnings:

  - You are about to drop the column `seriessummary` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SeriesGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SeriesGenre" DROP CONSTRAINT "_SeriesGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_SeriesGenre" DROP CONSTRAINT "_SeriesGenre_B_fkey";

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "seriessummary",
ADD COLUMN     "seriesgenres" TEXT[];

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "_SeriesGenre";
