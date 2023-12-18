/*
  Warnings:

  - You are about to drop the `FriendRequestss` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_authorId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_channelId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userStatsId_fkey";

-- DropTable
DROP TABLE "FriendRequestss";

-- DropTable
DROP TABLE "UserStats";

-- DropTable
DROP TABLE "messages";
