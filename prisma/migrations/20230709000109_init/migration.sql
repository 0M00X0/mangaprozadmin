/*
  Warnings:

  - The `seriesgenres` column on the `Series` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "seriesgenres",
ADD COLUMN     "seriesgenres" JSONB[];
