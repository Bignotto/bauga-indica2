/*
  Warnings:

  - You are about to drop the column `contractId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `reviewDate` on the `review` table. All the data in the column will be lost.
  - Added the required column `contract_id` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_contractId_fkey";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "contractId",
DROP COLUMN "reviewDate",
ADD COLUMN     "contract_id" INTEGER NOT NULL,
ADD COLUMN     "review_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
