/*
  Warnings:

  - The `seriesgenres` column on the `Series` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `seriesscore` on the `Series` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "seriesscore",
ADD COLUMN     "seriesscore" INTEGER NOT NULL,
DROP COLUMN "seriesgenres",
ADD COLUMN     "seriesgenres" INTEGER[];
