/*
  Warnings:

  - You are about to drop the column `habitId` on the `Received` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[index]` on the table `Received` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Received" DROP CONSTRAINT "Received_habitId_fkey";

-- DropIndex
DROP INDEX "Received_habitId_key";

-- AlterTable
ALTER TABLE "Received" DROP COLUMN "habitId";

-- CreateIndex
CREATE UNIQUE INDEX "Received_index_key" ON "Received"("index");

-- AddForeignKey
ALTER TABLE "Received" ADD CONSTRAINT "Received_index_fkey" FOREIGN KEY ("index") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
