/*
  Warnings:

  - You are about to drop the column `movieid` on the `cart` table. All the data in the column will be lost.
  - Added the required column `cartid` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_movieid_fkey";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "movieid",
ADD COLUMN     "purchasedate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "cartid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_cartid_fkey" FOREIGN KEY ("cartid") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
