/*
  Warnings:

  - You are about to drop the column `finished` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `full` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `scoreL` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `scoreR` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `winnerId` on the `games` table. All the data in the column will be lost.
  - You are about to drop the `_GamePlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GamePlayers" DROP CONSTRAINT "_GamePlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_GamePlayers" DROP CONSTRAINT "_GamePlayers_B_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_winnerId_fkey";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "finished",
DROP COLUMN "full",
DROP COLUMN "mode",
DROP COLUMN "ownerId",
DROP COLUMN "position",
DROP COLUMN "scoreL",
DROP COLUMN "scoreR",
DROP COLUMN "status",
DROP COLUMN "type",
DROP COLUMN "winnerId";

-- DropTable
DROP TABLE "_GamePlayers";
