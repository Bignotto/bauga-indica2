-- AlterTable
ALTER TABLE "contract" ALTER COLUMN "due_date" DROP NOT NULL,
ALTER COLUMN "execution_date" DROP NOT NULL,
ALTER COLUMN "closing_date" DROP NOT NULL,
ALTER COLUMN "service_provided" DROP NOT NULL,
ALTER COLUMN "service_reviewd" DROP NOT NULL,
ALTER COLUMN "provider_agreed" DROP NOT NULL,
ALTER COLUMN "contractor_agreed" DROP NOT NULL;
