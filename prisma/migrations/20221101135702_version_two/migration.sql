/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `bills` table. All the data in the column will be lost.
  - Added the required column `invoiceId` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_invoiceId_fkey`;

-- AlterTable
ALTER TABLE `bills` DROP COLUMN `invoiceId`;

-- AlterTable
ALTER TABLE `sales` ADD COLUMN `invoiceId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `invoicing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
