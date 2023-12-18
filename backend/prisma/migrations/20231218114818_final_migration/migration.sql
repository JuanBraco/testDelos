/*
  Warnings:

  - You are about to drop the column `expert` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstCon` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is2FAPassed` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is2FAuthEnabled` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isPlaying` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastOffline` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `online` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `twoFAuthSecret` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userStatsId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_BannedUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlockedUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChannelAdmins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChannelMembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FirendsUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_InvitedUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MutedUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `channels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BannedUsers" DROP CONSTRAINT "_BannedUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_BannedUsers" DROP CONSTRAINT "_BannedUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_BlockedUser" DROP CONSTRAINT "_BlockedUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlockedUser" DROP CONSTRAINT "_BlockedUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelAdmins" DROP CONSTRAINT "_ChannelAdmins_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelAdmins" DROP CONSTRAINT "_ChannelAdmins_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelMembers" DROP CONSTRAINT "_ChannelMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelMembers" DROP CONSTRAINT "_ChannelMembers_B_fkey";

-- DropForeignKey
ALTER TABLE "_FirendsUser" DROP CONSTRAINT "_FirendsUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FirendsUser" DROP CONSTRAINT "_FirendsUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_InvitedUsers" DROP CONSTRAINT "_InvitedUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvitedUsers" DROP CONSTRAINT "_InvitedUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_MutedUsers" DROP CONSTRAINT "_MutedUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_MutedUsers" DROP CONSTRAINT "_MutedUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "channels" DROP CONSTRAINT "channels_ownerId_fkey";

-- DropIndex
DROP INDEX "users_userStatsId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "expert",
DROP COLUMN "firstCon",
DROP COLUMN "is2FAPassed",
DROP COLUMN "is2FAuthEnabled",
DROP COLUMN "isPlaying",
DROP COLUMN "lastOffline",
DROP COLUMN "online",
DROP COLUMN "twoFAuthSecret",
DROP COLUMN "userStatsId";

-- DropTable
DROP TABLE "_BannedUsers";

-- DropTable
DROP TABLE "_BlockedUser";

-- DropTable
DROP TABLE "_ChannelAdmins";

-- DropTable
DROP TABLE "_ChannelMembers";

-- DropTable
DROP TABLE "_FirendsUser";

-- DropTable
DROP TABLE "_InvitedUsers";

-- DropTable
DROP TABLE "_MutedUsers";

-- DropTable
DROP TABLE "channels";

-- DropEnum
DROP TYPE "ChannelType";

-- DropEnum
DROP TYPE "GameMode";

-- DropEnum
DROP TYPE "GameType";
